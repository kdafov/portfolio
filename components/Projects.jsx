import styles from '@/styles/Projects.module.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
    return (
        <section className={styles.projectFrame}>
            <Nav />
            <section className={styles.projectsParent}>
                <h1 className={styles.title}>Project showcase</h1>
                
                <div className={styles.showcaseFrame}>
                    <Image src={'/rc-4.png'} alt='Dashboard' height={350} width={500} />
                    <div className={styles.showcaseRightPanel}> 
                        <span className={styles.projectTitle}>Connect Recruitment</span>
                        <span className={styles.projectDesc}>Connect Recruitment platform is the modern way to find, post and manage jobs. As a user you will browse jobs, with access to multiple filters for the most efficient search, and apply with ease with all the tools you need provided by the platform. As a company administrator you can manage, view and edit all aspect of your company along with controlling access of your recruiting team. As a recruiter your job has never been so easy - manage jobs with a few clicks, read job applications in a strctured and easy to interact with way, create job adverts and monitor company performance as well as personal performance. Connect has all you need it just misses you, your company or your amazing recruiting skills. Join now!</span>
                        <div className={styles.projectHighlights}>
                            <div>NextJS</div>
                            <div>MySQL</div>
                            <div>MUI</div>
                            <div>GCP</div>
                            <div>Bash</div>
                            <div>Git</div>
                            <div>Custom design</div>
                        </div>
                        <span className={styles.additional}>Project available <b><Link href='https://github.com/kdafov/connect-recruit/' target='_blank'>here</Link></b>.</span>
                    </div>
                </div>

                <div className={styles.showcaseFrame}>
                    <Image src={'/acc-1.png'} alt='Home Page' height={350} width={500} />
                    <div className={styles.showcaseRightPanel}> 
                        <span className={styles.projectTitle}>AllCityCleaning</span>
                        <span className={styles.projectDesc}>AllCityCleaning is the cutting-edge solution that has redefined the landscape of cleaning services. Our platform reshapes client interactions, providing an effortless and efficient online management system. Clients seamlessly book services, check availability, explore reviews, and view before and after photos. Each client receives a bespoke quote, embodying our commitment to personalized service. Our platform boasts cutting-edge captcha protection, mobile accessibility, and a sleek, business-color-themed design, delivering a truly modern cleaning experience.</span>
                        <div className={styles.projectHighlights}>
                            <div>ReactJS</div>
                            <div>NodeJS</div>
                            <div>MySQL</div>
                            <div>MUI</div>
                            <div>Docker</div>
                            <div>Stripe</div>
                            <div>NodeMailer</div>
                            <div>TypeScript</div>
                            <div>Custom design</div>
                        </div>
                        <span className={styles.additional}>Live at: <b><Link href='https://allcitycleaning.co.uk' target='_blank'>allcitycleaning.co.uk</Link></b></span>
                    </div>
                </div>
            </section>
            <Footer contentToBeAdded_R={
                <span className={styles.version}>v. b17-0832</span>
            }/>
        </section>
    )
}