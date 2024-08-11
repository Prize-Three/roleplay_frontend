import React, { useEffect, useState } from 'react';
import styles from './Result.module.scss';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function Result() {
    const navigate = useNavigate();
    const [analysisData, setAnalysisData] = useState(null);

    useEffect(() => {
        const fetchAnalysisData = async () => {
            try {
                const response = await fetch('http://localhost:8000/analysis');
                if (!response.ok) {
                    throw new Error('데이터를 가져오는데 실패했습니다.');
                }
                const data = await response.json();
                setAnalysisData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchAnalysisData();
    }, []);

    if (!analysisData) {
        return <div>Loading...</div>;
    }

    const { role_play, conversation_summary, language_development_analysis, emotional_development_analysis, interaction_patterns, comprehensive_results } = analysisData;

    return (
        <Layout>
            <div className={styles.resultContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>놀이 결과</h1>
                    <button className={styles.backButton} onClick={() => navigate('/')}>돌아가기</button>
                </div>
                <div className={styles.body}>
                    <div className={styles.section}>
                        <h2>기본 정보</h2>
                        <p><strong>역할놀이 종류:</strong> {role_play.type}</p>
                        <p><strong>시작 시간:</strong> {role_play.start_time}</p>
                        <p><strong>진행 시간:</strong> {role_play.end_time}</p>
                        <p><strong>민규 역할:</strong> {role_play.child_role}</p>
                        <p><strong>AI 역할:</strong> {role_play.ai_role}</p>
                    </div>
                    <div className={styles.section}>
                        <h2>대화 요약</h2>
                        <p>{conversation_summary}</p>
                    </div>
                    <div className={styles.section}>
                        <h2>언어 발달 분석</h2>
                        <p><strong>기본 어휘 사용 비율:</strong> {(language_development_analysis.vocabulary_use.basic_word_count / language_development_analysis.vocabulary_use.total_word_count * 100).toFixed(2)}%</p>
                        <p><strong>고급 어휘 사용 비율:</strong> {(language_development_analysis.vocabulary_use.new_word_count / language_development_analysis.vocabulary_use.total_word_count * 100).toFixed(2)}%</p>
                        <p><strong>주요 사용 어휘 표현:</strong> {language_development_analysis.vocabulary_use.new_used_words.join(', ')}</p>
                        <div className={styles.analysisList}>
                            {language_development_analysis.sentence_structure.map((item, index) => (
                                <div key={index} className={styles.analysisItem}>
                                    <p>{item.dialog_conent}</p>
                                    <p>{item.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h2>감정 발달 분석</h2>
                        <p><strong>감정 어휘 사용 비율:</strong> {(emotional_development_analysis.vocabulary_use.basic_word_count / emotional_development_analysis.vocabulary_use.total_word_count * 100).toFixed(2)}%</p>
                        <p><strong>감정 표현 문장 활용 비율:</strong> {(emotional_development_analysis.vocabulary_use.new_word_count / emotional_development_analysis.vocabulary_use.total_word_count * 100).toFixed(2)}%</p>
                        <p><strong>주요 사용 감정 표현:</strong> {emotional_development_analysis.vocabulary_use.new_used_words.join(', ')}</p>
                        <div className={styles.analysisList}>
                            {emotional_development_analysis.sentence_structure.map((item, index) => (
                                <div key={index} className={styles.analysisItem}>
                                    <p>{item.dialog_conent}</p>
                                    <p>{item.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h2>상호작용 분석</h2>
                        <p><strong>민규의 발화 비율:</strong> {interaction_patterns.child_questions_and_responses_rate.child_responses}</p>
                        <p><strong>AI의 발화 비율:</strong> {interaction_patterns.child_questions_and_responses_rate.ai_responses}</p>
                        <p><strong>대화 주도성 분석:</strong> {interaction_patterns.interaction_summary}</p>
                    </div>
                    <div className={styles.section}>
                        <h2>종합 평가</h2>
                        <p>{comprehensive_results}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Result;