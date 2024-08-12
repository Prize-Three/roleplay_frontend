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

    const renderProgressCircle = (percentage, label) => {
        const strokeDasharray = `${percentage} ${100 - percentage}`;
        return (
            <div className={styles.progressItem}>
                <p>{label}</p>
                <svg className={styles.progressCircle} viewBox="0 0 36 36">
                    <path
                        className={styles.circleBg}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className={styles.circle}
                        strokeDasharray={strokeDasharray}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className={styles.percentage}>
                        {percentage}%
                    </text>
                </svg>
            </div>
        );
    };

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
                        <div className={styles.infoColumn}>
                            <div className={styles.infoItem}>
                                <strong>역할놀이 종류:</strong> {role_play.type}
                            </div>
                            <div className={styles.infoItem}>
                                <strong>시작 시간:</strong> {role_play.start_time}
                            </div>
                            <div className={styles.infoItem}>
                                <strong>진행 시간:</strong> {role_play.end_time}
                            </div>
                        </div>
                        <div className={styles.roleGrid}>
                            <div className={styles.roleItem}>
                                <div className={styles.imageWrapper}>
                                    <div className={styles.roleOverlay}>민규 역할</div>
                                    <img src='/assets/result/child_role_img.png' alt="민규 역할" className={styles.roleImage} />
                                </div>
                                <p className={styles.roleLabel}>{role_play.child_role}</p>
                            </div>
                            <div className={styles.roleItem}>
                                <div className={styles.imageWrapper}>
                                    <div className={styles.roleOverlay}>AI 역할</div>
                                    <img src='/assets/result/ai_role_img.png' alt="AI 역할" className={styles.roleImage} />
                                </div>
                                <p className={styles.roleLabel}>{role_play.ai_role}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h2>대화 요약</h2>
                        <p className={styles.summary}>{conversation_summary}</p>
                    </div>
                    <div className={styles.section}>
                        <h2>언어 발달 분석</h2>
                        <div className={styles.progressContainer}>
                            {renderProgressCircle(
                                ((language_development_analysis.vocabulary_use.basic_word_count / (language_development_analysis.vocabulary_use.basic_word_count + language_development_analysis.vocabulary_use.new_word_count)) * 100).toFixed(2),
                                '기본 어휘 사용 비율'
                            )}
                            {renderProgressCircle(
                                ((language_development_analysis.vocabulary_use.new_word_count / (language_development_analysis.vocabulary_use.basic_word_count + language_development_analysis.vocabulary_use.new_word_count)) * 100).toFixed(2),
                                '고급 어휘 사용 비율'
                            )}
                        </div>
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
                        <div className={styles.progressContainer}>
                            {renderProgressCircle(
                                ((emotional_development_analysis.vocabulary_use.basic_word_count / (emotional_development_analysis.vocabulary_use.basic_word_count + emotional_development_analysis.vocabulary_use.new_word_count)) * 100).toFixed(2),
                                '감정 어휘 사용 비율'
                            )}
                            {renderProgressCircle(
                                ((emotional_development_analysis.vocabulary_use.new_word_count / (emotional_development_analysis.vocabulary_use.basic_word_count + emotional_development_analysis.vocabulary_use.new_word_count)) * 100).toFixed(2),
                                '감정 표현 문장 활용 비율'
                            )}
                        </div>
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
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}><strong>민규의 발화 비율:</strong> {interaction_patterns.child_questions_and_responses_rate.child_responses}</div>
                            <div className={styles.infoItem}><strong>AI의 발화 비율:</strong> {interaction_patterns.child_questions_and_responses_rate.ai_responses}</div>
                        </div>
                        <p className={styles.summary}><strong>대화 주도성 분석:</strong> {interaction_patterns.interaction_summary}</p>
                    </div>
                    <div className={styles.section}>
                        <h2>종합 평가</h2>
                        <p className={styles.summary}>{comprehensive_results}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Result;