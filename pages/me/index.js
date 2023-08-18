/* 
* THIS IS AN EXPERIMENTAL FILE.
* IT IS NOT WRITTEN IN ACCORDANCE WITH THE STANDARD CODING PRACTICES.
**/

import { useState } from "react";
import styles from '@/styles/Me.module.css';
import axios from "axios";

export const getServerSideProps = async () => {
    // Logic for fetching reviews data
    const reviews = await fetch(process.env.URL_ORIGIN + '/api/manage-reviews');
    const reviewsData = await reviews.json();

    // Logic for fetching requests
    const requests = await fetch(process.env.URL_ORIGIN + '/api/load-requests');
    const requestsData = await requests.json();
  
    // Return props
    return { props : { reviewsData, requestsData } }
}

export default function Page({ reviewsData, requestsData }) {
    const [unlocked, setUnlocked] = useState(false);

    const deletePendingReview = (id) => {
        axios.delete(process.env.URL_ORIGIN + '/api/manage-reviews?id=' + id);
    }

    const confirmPendingReview = (name, relation, content) => {
        axios.put(process.env.URL_ORIGIN + '/api/manage-reviews', {
            name,
            relation,
            content
        })
    }

    return (
        <section>
            {unlocked ? <section>
                <div>
                    <div className={styles.masterTitle}><span>| Reviews on hold |</span></div>
                    {reviewsData.map((v, i) => (
                        <div className={styles.revEach} key={i}>
                            <span>{v[0]}</span>
                            <span>{v[1]}</span>
                            <span>{v[2]}</span>
                            <span>{v[3]}</span>
                            <div className={styles.btnFrame}>
                                <button className={styles.btns} onClick={() => deletePendingReview(v[0])}>X</button>
                                <button className={styles.btns} onClick={() => {
                                    confirmPendingReview(v[1],v[2],v[3]);
                                    deletePendingReview(v[0]);
                                }}>Y</button>
                            </div>
                        </div>
                    ))}

                    <div className={styles.masterTitle}><span>| Requests |</span></div>
                    {requestsData.map((v, i) => (
                        <div className={styles.revEach} key={i}>
                            <span>{v[0]}</span>
                            <span>{v[1]}</span>
                            <span>{v[2]}</span>
                        </div>
                    ))}

                    <div className={styles.masterTitle}><span>| Actions |</span></div>
                    <button onClick={() => {setUnlocked(false)}}>EXIT</button>
                </div>
            </section> : <div className={styles.initialDiv}>
                Enter password:
                <input type="password" id="FC2AA09"/>
                <span className={styles.verifySpan} onClick={() => {
                    if (document.getElementById('FC2AA09').value === process.env.MASTER_PIN) {
                        setUnlocked(true);
                    }
                }}>Verify</span>
            </div>}
        </section>
    )
}