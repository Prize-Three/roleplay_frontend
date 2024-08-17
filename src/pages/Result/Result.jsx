import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Result.module.scss';
import Layout from '../../components/Layout/Layout';

function Result() {
    const navigate = useNavigate();
    const { historyId } = useParams();
    const numericHistoryId = parseInt(historyId, 10);
    const [analysisData, setAnalysisData] = useState(null);
    const [scriptData, setScriptData] = useState([]); // State for script data
    const [activeTab, setActiveTab] = useState('basicInfo');

    useEffect(() => {
        const fetchAnalysisData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/report/${numericHistoryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch analysis data.');
                }
                const data = await response.json();
                setAnalysisData(data);
            } catch (error) {
                console.error('Error fetching analysis data:', error);
            }
        };

        const fetchScriptData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/dialog/${numericHistoryId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch script data.');
                }
                const data = await response.json();
                console.log('Fetched script data:', data); // Log fetched data
                setScriptData(data);
            } catch (error) {
                console.error('Error fetching script data:', error);
            }
        };

        if (numericHistoryId) {
            fetchAnalysisData();
            fetchScriptData(); // Fetch script data
        }
    }, [numericHistoryId]);

    if (!analysisData) {
        return <div>Loading...</div>;
    }

    const {
        history: { type, child_role, ai_role, start_time, end_time, setting_voice },
        report: { conversation_summary, interaction_summary, comprehensive_results },
        language_development: { vocabulary, sentence_structure: languageSentenceStructure },
        emotional_development: { vocabulary: emotionalVocabulary, sentence_structure: emotionalSentenceStructure }
    } = analysisData;

    const renderContent = () => {
        switch (activeTab) {
            case 'basicInfo':
                return (
                    <div className={styles.section}>
                        <h2>기본 정보</h2>
                        <div className={styles.infoColumn}>
                            <div className={styles.infoItem}>
                                <strong>역할놀이 종류:</strong> {type}
                            </div>
                            <div className={styles.infoItem}>
                                <strong>시작 시간:</strong> {start_time}
                            </div>
                            <div className={styles.infoItem}>
                                <strong>진행 시간:</strong> {end_time - start_time}
                            </div>
                        </div>
                        <div className={styles.roleGrid}>
                            <div className={styles.roleItem}>
                                <div className={styles.roleOverlay}>사용자 역할</div>
                                <div className={styles.imageWrapper}>
                                    <img src='/assets/result/child_role_img.png' alt="민규 역할" className={styles.roleImage} />
                                </div>
                                <p className={styles.roleLabel}>{child_role}</p>
                            </div>
                            <div className={styles.roleItem}>
                                <div className={styles.roleOverlay}>AI 역할</div>
                                <div className={styles.imageWrapper}>
                                    <img src='/assets/result/ai_role_img.png' alt="AI 역할" className={styles.roleImage} />
                                </div>
                                <p className={styles.roleLabel}>{ai_role}</p>
                            </div>
                        </div>
                    </div>
                );
            case 'fullScript':
                return (
                    <div className={styles.section}>
                        <h2>전체 스크립트</h2>
                        <div className={styles.scriptContainer}>
                            {console.log(scriptData)} {/* Log script data */}
                            {scriptData.map((entry, index) => (
                                <div key={index} className={styles.scriptEntry}>
                                    <strong>{entry.speaker}:</strong> {entry.message}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'summary':
                return (
                    <div className={styles.section}>
                        <h2>역할놀이 대화 내용 요약</h2>
                        <p className={styles.summary}>{conversation_summary}</p>
                    </div>
                );
            case 'language':
                return (
                    <div className={styles.section}>
                        <h2>언어 발달 분석</h2>
                        <div className={styles.progressContainer}>
                            {renderProgressCircle(
                                ((vocabulary.basic_word_count / (vocabulary.basic_word_count + vocabulary.new_word_count)) * 100).toFixed(2),
                                '기본 어휘 사용 비율'
                            )}
                            {renderProgressCircle(
                                ((vocabulary.new_word_count / (vocabulary.basic_word_count + vocabulary.new_word_count)) * 100).toFixed(2),
                                '고급 어휘 사용 비율'
                            )}
                        </div>
                        <p><strong>주요 사용 어휘 표현:</strong></p>
                        <div className={styles.wordButtonContainer}>
                            {vocabulary.new_used_words.map((word, index) => (
                                <span key={index} className={styles.wordButton}>{word}</span>
                            ))}
                        </div>
                        <div className={styles.analysisList}>
                            {languageSentenceStructure.map((item, index) => (
                                <div key={index} className={styles.analysisItem}>
                                    <p className={styles.sentence}>{item.dialog_content}</p>
                                    <p className={styles.comment}>{item.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'emotion':
                return (
                    <div className={styles.section}>
                        <h2>감정 발달 분석</h2>
                        <div className={styles.progressContainer}>
                            {renderProgressCircle(
                                ((emotionalVocabulary.basic_word_count / (emotionalVocabulary.basic_word_count + emotionalVocabulary.new_word_count)) * 100).toFixed(2),
                                '감정 어휘 사용 비율'
                            )}
                            {renderProgressCircle(
                                ((emotionalVocabulary.new_word_count / (emotionalVocabulary.basic_word_count + emotionalVocabulary.new_word_count)) * 100).toFixed(2),
                                '감정 표현 문장 활용 비율'
                            )}
                        </div>
                        <p><strong>주요 사용 감정 표현:</strong></p>
                        <div className={styles.wordButtonContainer}>
                            {emotionalVocabulary.new_used_words.map((word, index) => (
                                <span key={index} className={styles.wordButton}>{word}</span>
                            ))}
                        </div>
                        <div className={styles.analysisList}>
                            {emotionalSentenceStructure.map((item, index) => (
                                <div key={index} className={styles.analysisItem}>
                                    <p className={styles.sentence}>{item.dialog_content}</p>
                                    <p className={styles.comment}>{item.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'interaction':
                return (
                    <div className={styles.section}>
                        <h2>상호작용 분석</h2>
                        {renderInteractionChart()}
                        <p className={styles.summary}><strong>대화 주도성 분석:</strong> {interaction_summary}</p>
                    </div>
                );
            case 'evaluation':
                return (
                    <div className={styles.section}>
                        <h2>종합 평가</h2>
                        <img src='/assets/result/great.png' alt="Great" className={styles.greatImage} />
                        <p className={styles.summary}>{comprehensive_results}</p>
                    </div>
                );
            default:
                return null;
        }
    };

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

    const renderInteractionChart = () => {
        const childResponses = analysisData.report.child_responses;
        const aiResponses = analysisData.report.child_questions;
        const totalResponses = childResponses + aiResponses;
        const childPercentage = (childResponses / totalResponses) * 100;
        const aiPercentage = (aiResponses / totalResponses) * 100;

        return (
            <div className={styles.interactionChart}>
                <svg viewBox="0 0 36 36" className={styles.circularChart}>
                    <circle
                        className={styles.circleBg}
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                    />
                    <circle
                        className={styles.childCircle}
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        strokeDasharray={`${childPercentage} ${100 - childPercentage}`}
                        strokeDashoffset="25"
                    />
                    <circle
                        className={styles.aiCircle}
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        strokeDasharray={`${aiPercentage} ${100 - aiPercentage}`}
                        strokeDashoffset={25 - childPercentage}
                    />
                </svg>
                <div className={styles.chartLabels}>
                    <div className={styles.childLabel} style={{ color: '#297EFF' }}>사용자: {childPercentage.toFixed(1)}%</div>
                    <div className={styles.aiLabel} style={{ color: '#F55A00' }}>AI: {aiPercentage.toFixed(1)}%</div>
                </div>
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
                    <div className={styles.leftPanel}>
                        <div className={styles.tabMenu}>
                            <button
                                className={activeTab === 'basicInfo' ? styles.active : ''}
                                onClick={() => setActiveTab('basicInfo')}
                            >
                                기본 정보
                            </button>
                            <button
                                className={activeTab === 'fullScript' ? styles.active : ''}
                                onClick={() => setActiveTab('fullScript')}
                            >
                                전체 스크립트
                            </button>
                            <button
                                className={activeTab === 'summary' ? styles.active : ''}
                                onClick={() => setActiveTab('summary')}
                            >
                                역할놀이 대화 내용 요약
                            </button>
                            <button
                                className={activeTab === 'language' ? styles.active : ''}
                                onClick={() => setActiveTab('language')}
                            >
                                언어 발달 분석
                            </button>
                            <button
                                className={activeTab === 'emotion' ? styles.active : ''}
                                onClick={() => setActiveTab('emotion')}
                            >
                                감정 발달 분석
                            </button>
                            <button
                                className={activeTab === 'interaction' ? styles.active : ''}
                                onClick={() => setActiveTab('interaction')}
                            >
                                상호작용 분석
                            </button>
                            <button
                                className={activeTab === 'evaluation' ? styles.active : ''}
                                onClick={() => setActiveTab('evaluation')}
                            >
                                종합 평가
                            </button>
                        </div>
                    </div>
                    <div className={styles.rightPanel}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Result;