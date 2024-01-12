from flask import Blueprint, request, jsonify
import h5py
import numpy as np
import pandas as pd
# from sklearn.model_selection import train_test_split

AIRouterPath = "./routers/AI"

# 라우터 설정
bp = Blueprint('AI', __name__, url_prefix='/AI')

# 데이터 파일 로드 (예시 데이터)
df = pd.read_csv(AIRouterPath + "/Add_UserId.csv", encoding='cp949')

# 교구 사용자-교구 행렬 생성 (예시 데이터 사용)
pivot_table = df.pivot_table(index='UserId', columns='제목', values='조회수', fill_value=0)

# UserId를 str 타입으로 변환
pivot_table.index = pivot_table.index.astype(str)

# MF.h5 파일에서 잠재요인 행렬 로드
with h5py.File(AIRouterPath + "/MF.h5", 'r') as hf:
    user_factors = hf['user_factors'][:]
    item_factors = hf['item_factors'][:]


# 사용자에게 교구 추천
def recommend_items(user_vector, item_factors, item_titles, top_n=5):
    # 사용자 잠재요인 벡터를 (50, 1) 형태로 변환
    user_vector = user_vector.reshape(-1, 1)

    # item_factors 데이터셋의 차원을 맞춰줌
    item_factors = item_factors.T  # (1907, 50) 형태로 변환

    # 유사도 계산
    scores = np.dot(item_factors, user_vector).flatten()

    # 유사도가 가장 높은 N개의 교구 추천
    top_item_indices = np.argsort(scores)[::-1][:top_n]
    recommended_items = item_titles[top_item_indices]

    return recommended_items


# 사용자 입력값에 따라 해당 사용자의 잠재요인 벡터 추출
def get_user_vector(grade_input, subject_input, pivot_table, user_factors):
    # 학년 입력값 처리
    grade_columns = ['1학년', '2학년', '3학년', '4학년', '5학년', '6학년', '학년기타']
    grade_value = ''.join(['1' if grade in grade_input else '0' for grade in grade_columns])

    # 과목 입력값 처리
    subject_columns = ['영어', '수학', '과학', '사회', '음악', '미술', '체육', '실과', '국어', '도덕', '창의체험', '통합교과', '과목기타']
    subject_value = ''.join(['1' if subject in subject_input else '0' for subject in subject_columns])

    # 학년과 과목 정보를 합쳐서 UserId 생성
    user_id = f"{grade_value}{subject_value}"

    # 사용자의 0이 생략된 UserId 생성
    user_id_no_omission = user_id.lstrip('0')

    # UserId가 pivot_table.index에 존재하는지 확인
    if user_id_no_omission not in pivot_table.index:
        raise ValueError(f"UserId {user_id_no_omission}에 해당하는 사용자가 없습니다.")

    # 사용자의 잠재요인 벡터 추출
    user_idx = list(pivot_table.index).index(user_id_no_omission)
    user_vector = user_factors[user_idx]

    return user_vector


@bp.route('/recommend', methods=['POST'])
def get_recommendations():
    # 사용자 입력값 받기
    data = request.get_json()
    grade_input = data.get('grade')
    subject_input = data.get('subject')

    # 사용자 잠재요인 벡터 추출
    user_vector = get_user_vector(grade_input, subject_input, pivot_table, user_factors)

    # 교구 추천
    item_titles = pivot_table.columns
    recommendations = recommend_items(user_vector, item_factors, item_titles, top_n=5)

    # 추천 결과를 리스트로 변환하여 JSON으로 반환
    return jsonify({
        'result': list(recommendations)
    })