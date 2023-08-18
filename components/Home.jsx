import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState, forwardRef } from 'react';
import 'animate.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home({ reviews, uploadReview, sendQuote }) {
  const homePageP1_ref = useRef(null);
  const homePageP2_ref = useRef(null);
  const homePageP3_ref = useRef(null);
  const homePageP4_ref = useRef(null);
  const [P1_active, setP1] = useState(true);
  const [P2_active, setP2] = useState(false);
  const [P3_active, setP3] = useState(false);
  const [P4_active, setP4] = useState(false);
  const [logo1, setLogo1] = useState(false);
  const [logo2, setLogo2] = useState(false);
  const [logo3, setLogo3] = useState(false);
  const [span, setSpan] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [reviewsContent, setReviewsContent] = useState(reviews);
  const [sliderN, setSliderN] = useState(0);
  const [overlayReviews, setOverlayReviews] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRelation, setReviewRelation] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [contactType, setContactType] = useState('Project / General');
  const [contactSubText, setContactSubText] = useState('I will be glad to help you build your website, app, software or micro-controller. Please include as much information as possible and once I look into in, I will schedule a call to discuss it further.');
  const [contactHelperText, setContactHelperText] = useState('Hi there, I would like you to create a website for my product which...');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [cvReq, setCVreq] = useState(false);
  const [emailForCV, setEmailForCV] = useState('');
  const [secret, setSecret] = useState('$ < % ! ? > *');

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowAlert(false);
  }

  const alertPrompt = (type,c) => {
    setShowAlert(true);
    setAlertContent(c);
    setAlertType(type);
  }

  useEffect(() => {
    // Observer
    const targets = [homePageP1_ref.current, homePageP2_ref.current, homePageP3_ref.current, homePageP4_ref.current];
    if (!targets) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.target === homePageP1_ref.current) {
          setP1(entry.isIntersecting);
        } else if (entry.target === homePageP2_ref.current) {
          setP2(entry.isIntersecting);
        } else if (entry.target === homePageP3_ref.current) {
          setP3(entry.isIntersecting);
        } else if (entry.target === homePageP4_ref.current) {
          setP4(entry.isIntersecting);
        }
      });
    }, options);

    targets.forEach(target => {
      if (target) {
        observer.observe(target);
      }
    });

    // Logo animation
    const firstLogo = setTimeout(() => {
      setLogo1(true);
    }, 3000);

    const cleanFirstLogo = setTimeout(() => {
      setLogo1(false);
    }, 8000);

    const secondLogo = setTimeout(() => {
      setLogo2(true);
    }, 10000);

    const cleanSecondLogo = setTimeout(() => {
      setLogo2(false);
    }, 12500);

    const thirdLogo = setTimeout(() => {
      setLogo3(true);
    }, 14500);

    const cleanThirdLogo = setTimeout(() => {
      setLogo3(false);
    }, 17000);

    const openText = setTimeout(() => {
      setSpan(true);
    }, 18500);

    const closeText = setTimeout(() => {
      setSpan(false);
    }, 21500);

    // Tech block flipping
    const blockFlipping = setInterval(() => {
      setActiveCategoryIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 8500);

    // Reviews slider
    const maxIndex = Math.floor((reviewsContent.length - 1) / 3);
    const sliderAnimation = setInterval(() => {
      setSliderN((prevIndex) => ((prevIndex + 1) * 3) + 1 <= reviewsContent.length ? prevIndex + 1 : 0);
    }, 9000);

    // Clear up
    return () => { 
      targets.forEach(target => {
        if (target) {
          observer.unobserve(target);
        }
      });
      clearTimeout(firstLogo);
      clearTimeout(cleanFirstLogo);
      clearTimeout(secondLogo);
      clearTimeout(cleanSecondLogo);
      clearTimeout(thirdLogo);
      clearTimeout(cleanThirdLogo);
      clearTimeout(openText);
      clearTimeout(closeText);
      clearInterval(blockFlipping);
      clearInterval(sliderAnimation);
    }
  }, []);

  const addNewReview = async () => {
    if (reviewName === undefined || reviewName.length === 0) {
      alertPrompt('error','Please enter a valid name.');
      return;
    }
    if (reviewRelation === undefined || reviewRelation.length === 0) {
      alertPrompt('error','Please enter a valid relation.');
      return;
    }
    if (reviewText === undefined || reviewText.length === 0) {
      alertPrompt('error','Please enter a valid review content.');
      return;
    }

    uploadReview([{
      name: reviewName,
      relation: reviewRelation,
      content: reviewText
    }]);
    alertPrompt('info', 'Review submitted. Thank you!'); 
  }

  const sendMessage = () => {
    if (contactName === undefined || contactName.length === 0) {
      alertPrompt('error','Please enter a valid name.');
      return;
    }
    if (contactEmail === undefined || contactEmail.length === 0) {
      alertPrompt('error','Please enter a valid email address.');
      return;
    }
    if (contactMsg === undefined || contactMsg.length < 5) {
      alertPrompt('error','Please enter a valid / longer message.');
      return;
    }

    sendQuote([{
      name: contactName,
      email: contactEmail,
      message: contactMsg
    }]);
    alertPrompt('info', 'Thank you for your message. I will reply soon.');
  }

  const sendCVRequest = () => {
    if (emailForCV === undefined || emailForCV.length === 0) {
      alertPrompt('error','Please enter a valid email address.');
      return;
    }

    sendQuote([{
      email: emailForCV,
      message: 'CV REQUEST'
    }]);
    alertPrompt('info', 'A request to send you CV has been submitted.');
  }

  return (
    <section className={styles.main}>
      <Nav />

      <main className={styles.content}>

        <section id='s1hp' ref={homePageP1_ref} className={styles.contentP1}>
          <div className={styles.intro}>
            <div className={P1_active ? 'animate__animated animate__fadeInLeft ' + styles.mainLabelDupl : ''}>
              <h2 className={styles.mainText}>Full-Stack Software Engineer</h2>
              <div className={styles.duplHidden}>
                <h2 className={styles.mainText}>Full-Stack Software Engineer</h2>
                <div className={styles.showcaseFrame}>
                  {logo1 && <Image src={'/l1.ico'} alt='AllCityCleaning' className={styles.recruitCnnLogo} height={196} width={196}/>}
                  {logo2 && <Image src={'/l2.ico'} alt='ConnectRecruiting' className={styles.accLogo} height={94} width={94} />}
                  {logo3 && <Image src={'/l3.png'} alt='DafovClub' className={styles.dcLogo} height={74} width={154} />}
                  {span && <span className={styles.companyText}>Your company next.</span>}
                </div>
              </div>
            </div>
            <div className={styles.subTextsParent}>
              <span className={P1_active ? 'animate__animated animate__fadeIn animate__delay-1s ' + styles.subText : ''}>Hey there, I&apos;m Kristian Dafov, and I&apos;m all about bringing cutting-edge technology to empower businesses in the digital age. I specialise in crafting rich web platforms, intricate desktop software, and user-friendly mobile apps, all designed to deliver an exceptional user experience.</span>
              <Link href={'/'} className={P1_active ? 'animate__animated animate__fadeIn animate__delay-1s ' + styles.refText : ''} onClick={() => {
                secret === '$ < % ! ? > *' ? alertPrompt('success', 'You have decoded the pattern.') : null;
                setSecret('import product from kristian.services');
              }}>{secret}</Link>
            </div>
          </div>          
        </section>

        <section id='s2hp' ref={homePageP2_ref} className={styles.contentP2}>
          <h1 className={P2_active ? 'animate__animated animate__fadeInLeft ' + styles.skillsTitle : ''}>Skillset &amp; Certifications</h1>
          <div className={P2_active ? 'animate__animated animate__fadeInLeft ' + styles.skillsetBottom : ''}>
            <div className={styles.techGalaxyContainer}>
              <div className={styles.innerOrbit}>
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'} alt='HTML' height={30} width={30} className={styles.innerOrbitContentL1} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'} alt='CSS' height={30} width={30} className={styles.innerOrbitContentL2} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'} alt='NextJS' height={30} width={30} className={styles.innerOrbitContentL3} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'} alt='NodeJS' height={30} width={30} className={styles.innerOrbitContentL4} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'} alt='ExpressJS' height={30} width={30} className={styles.innerOrbitContentL5} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'} alt='Java' height={30} width={30} className={styles.innerOrbitContentL6} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'} alt='Python' height={30} width={30} className={styles.innerOrbitContentL7} />
              </div>
              <div className={styles.middleOrbit}>
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg'} alt='AWS' height={35} width={35} className={styles.middleOrbitContentL1} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg'} alt='Android Studio' height={35} width={35} className={styles.middleOrbitContentL2} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg'} alt='Bash' height={35} width={35} className={styles.middleOrbitContentL3} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'} alt='Bootstrap' height={35} width={35} className={styles.middleOrbitContentL4} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg'} alt='C' height={35} width={35} className={styles.middleOrbitContentL5} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'} alt='Docker' height={35} width={35} className={styles.middleOrbitContentL6} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'} alt='Figma' height={35} width={35} className={styles.middleOrbitContentL7} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg'} alt='Flask' height={35} width={35} className={styles.middleOrbitContentL8} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'} alt='Git' height={35} width={35} className={styles.middleOrbitContentL9} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg'} alt='GCP' height={35} width={35} className={styles.middleOrbitContentL10} />
              </div>
              <div className={styles.outerOrbit}>
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'} alt='JS' height={42} width={42} className={styles.outerOrbitContentL1} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg'} alt='Jupyter Notebook' height={42} width={42} className={styles.outerOrbitContentL2} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg'} alt='K8' height={42} width={42} className={styles.outerOrbitContentL3} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg'} alt='MaterialUI' height={42} width={42} className={styles.outerOrbitContentL4} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'} alt='MongoDB' height={42} width={42} className={styles.outerOrbitContentL5} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'} alt='SQL' height={42} width={42} className={styles.outerOrbitContentL7} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg'} alt='PHP' height={42} width={42} className={styles.outerOrbitContentL8} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg'} alt='RaspberryPI' height={42} width={42} className={styles.outerOrbitContentL9} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'} alt='ReactJS' height={42} width={42} className={styles.outerOrbitContentL10} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg'} alt='SocketIO' height={42} width={42} className={styles.outerOrbitContentL11} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg'} alt='TypeScript' height={42} width={42} className={styles.outerOrbitContentL12} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'} alt='Spring' height={42} width={42} className={styles.outerOrbitContentL13} />

                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'} alt='HTML' height={30} width={30} className={styles.innerOrbitContentL1R} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'} alt='CSS' height={30} width={30} className={styles.innerOrbitContentL2R} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'} alt='NextJS' height={30} width={30} className={styles.innerOrbitContentL3R} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'} alt='NodeJS' height={30} width={30} className={styles.innerOrbitContentL4R} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'} alt='ExpressJS' height={30} width={30} className={styles.innerOrbitContentL5R} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'} alt='Java' height={30} width={30} className={styles.innerOrbitContentL6R} />
                <Image src={'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'} alt='Python' height={30} width={30} className={styles.innerOrbitContentL7R} />
              </div>
            </div>

            <div className={styles.rightSideSkillset}>
              <div className={styles.categoryContainer}>
              <div className={activeCategoryIndex === 0 ? 'animate__animated animate__fadeIn ' + styles.skillsetIndividual : styles.inactive}>
                <span className={styles.skillsetTitle}>Desktop software</span>
                <span className={styles.skillsetSubText}>Got a great idea for personalised software for you or your company?</span>
                <ul className={styles.skillsetUL}>
                  <li>Messaging and Communication app</li>
                  <li>Inventory System</li>
                  <li>HR Software tailored to your company</li>
                  <li>Recruiting software</li>
                  <li>Remote control over systems</li>
                </ul>
              </div>

              <div className={activeCategoryIndex === 1 ? 'animate__animated animate__fadeIn ' + styles.skillsetIndividual : styles.inactive}>
                <span className={styles.skillsetTitle}>Mobile applications</span>
                <span className={styles.skillsetSubText}>Make appearance at Google Play or App Store with your first mobile app</span>
                <ul className={styles.skillsetUL}>
                  <li>Communication app</li>
                  <li>Micro version of your business</li>
                  <li>Clock-in/out system</li>
                  <li>Business enhancing apps</li>
                  <li>Learning portals / Employee training apps</li>
                </ul>
              </div>

              <div className={activeCategoryIndex === 2 ? 'animate__animated animate__fadeIn ' + styles.skillsetIndividual : styles.inactive}>
                <span className={styles.skillsetTitle}>Website setup & maintenance</span>
                <span className={styles.skillsetSubText}>Outstanding website as one of the best ways to make digital appearance</span>
                <ul className={styles.skillsetUL}>
                  <li>E-commerce Websites</li>
                  <li>Portfolio Websites</li>
                  <li>Corporate Websites</li>
                  <li>Educational Websites</li>
                  <li>News and Media Websites</li>
                </ul>
              </div>

              <div className={activeCategoryIndex === 3 ? 'animate__animated animate__slower animate__fadeIn ' + styles.skillsetIndividual : styles.inactive}>
                <span className={styles.skillsetTitle}>Embedded systems</span>
                <span className={styles.skillsetSubText}>Powerful logic and substantial value within a compact enclosure</span>
                <ul className={styles.skillsetUL}>
                  <li>Collecting data from remote sensors</li>
                  <li>Home automation</li>
                  <li>Home inventory systems</li>
                  <li>Network monitor tool</li>
                  <li>Voice assistant software</li>
                </ul>
              </div>
              </div>

              <div className={styles.certParent}>
                <div>
                  <Image src={'/cert.png'} alt='Certificate' height={60} width={60} />
                  <span>Full-Stack Fundamentals Training</span>
                </div>

                <div>
                  <Image src={'/letter.png'} alt='Recommendation letter' height={60} width={60} />
                  <span>Recommended by Publicis Sapient, AllCityCleaning & More</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section id='s3hp' ref={homePageP3_ref} className={styles.contentP3}>
          <h1 className={P3_active ? 'animate__animated animate__fadeInLeft ' + styles.skillsTitle : styles.inactive}>Hear more from employers &amp; colleagues</h1>
          <div className={P3_active ? 'animate__animated animate__fadeInLeft ' + styles.skillsSubTitle : styles.inactive}>(Hover / Hold over text to see full content)</div>

          <div className={P3_active ? 'animate__animated animate__fadeInLeft ' + styles.reviewsSlider : styles.inactive}>
            {reviewsContent.map((v, i) => 
              (
                <LightTooltip title={v[2]} placement="top" key={i}>
                <div className={3 * sliderN + 0 === i || 3 * sliderN + 1 === i || 3 * sliderN + 2 === i ? styles.reviewsEach : styles.reviewsHide}> 
                  <span className={styles.reviewsTitle}>{v[0]}</span>
                  <span className={styles.reviewsSub}>{v[1]}</span>
                  <span className={styles.reviewsText}>{v[2]}</span>
                </div>
                </LightTooltip>
              )
            )}
            <span className={styles.newReview} onClick={() => setOverlayReviews(true)}>&#43;</span>
          </div>

          <div className={P3_active ? 'animate__animated animate__fadeInLeft ' + styles.factsRoot : styles.inactive}>
            <div className={styles.factsParent}>
                <div className={styles.factsIndividual + ' ' + styles.factsMixDisplayL}>
                  <Image src={'/star.svg'} alt={'Guaranteed'} height={45} width={45} className={P3_active ? 'animate__animated animate__flip animate__delay-1s' : styles.inactive}/>
                  <div>
                    <span className={styles.factsMainFont}>Client-Centric Approach</span>
                    <span className={styles.factsSubFont}>Your preferences lead our process</span>
                  </div>
                </div>
                <div className={styles.factsIndividual + ' ' + styles.factsMixDisplayR}>
                  <Image src={'/star.svg'} alt={'Guaranteed'} height={45} width={45} className={P3_active ? 'animate__animated animate__flip animate__delay-2s' : styles.inactive}/>
                  <div>
                    <span className={styles.factsMainFont}>Transparent process & communication</span>
                    <span className={styles.factsSubFont}>Trust our open and honest collaboration</span>
                  </div>
                </div>
                <div className={styles.factsIndividual + ' ' + styles.factsMixDisplayL}>
                  <Image src={'/star.svg'} alt={'Guaranteed'} height={45} width={45} className={P3_active ? 'animate__animated animate__flip animate__delay-1s' : styles.inactive}/>
                  <div>
                    <span className={styles.factsMainFont}>Informed Every Step</span>
                    <span className={styles.factsSubFont}>We keep you updated continuously</span>
                  </div>
                </div>
            </div>
            <div className={styles.factsParent}>
                <div className={styles.factsIndividual + ' ' + styles.factsMixDisplayR}>
                  <Image src={'/star.svg'} alt={'Guaranteed'} height={45} width={45} className={P3_active ? 'animate__animated animate__flip animate__delay-2s' : styles.inactive}/>
                  <div>
                    <span className={styles.factsMainFont}>Ongoing Support</span>
                    <span className={styles.factsSubFont}>Our commitment to the upkeep of the project continues, even after it end</span>
                  </div>
                </div>
                <div className={styles.factsIndividual + ' ' + styles.factsMixDisplayL}>
                  <Image src={'/star.svg'} alt={'Guaranteed'} height={45} width={45} className={P3_active ? 'animate__animated animate__flip animate__delay-1s' : styles.inactive}/>
                  <div>
                    <span className={styles.factsMainFont}>Adapt to Standards</span>
                    <span className={styles.factsSubFont}>We evolve your product to fit</span>
                  </div>
                </div>
                <div className={styles.factsIndividual + ' ' + styles.factsMixDisplayR}>
                  <Image src={'/star.svg'} alt={'Guaranteed'} height={45} width={45} className={P3_active ? 'animate__animated animate__flip animate__delay-2s' : styles.inactive}/>
                  <div>
                    <span className={styles.factsMainFont}>Design & Ads Solutions</span>
                    <span className={styles.factsSubFont}>We provide options for designing a product and advertising it</span>
                  </div>
                </div>
            </div>
            <div>
              
            </div>
          </div>
        </section>

        <section id='s4hp' ref={homePageP4_ref} className={styles.s4}>
          <h1 className={P4_active ? 'animate__animated animate__fadeInLeft ' + styles.skillsTitle : styles.inactive}>Get in touch</h1>

          <div className={P4_active ? 'animate__animated animate__fadeInLeft ' + styles.formRoot : styles.inactive}>
            <span className={styles.contactSubText}>Every new project is an opportunity to be better</span>
            <div className={styles.formTopParent}>
              <div className={contactType === 'Project / General' ? styles.formTopIndividualActive : styles.formTopIndividual} onClick={() => {
                setContactType('Project / General');
                setContactSubText('I will be glad to help you build your website, app, software or micro-controller. Please include as much information as possible and once I look into in, I will schedule a call to discuss it further.');
                setContactHelperText('Hi there, I would like you to create a website for my product which...');
              }}>
                <Image src={'/coding.png'} alt='need project?' height={40} width={40} className={P4_active ? 'animate__animated animate__flip animate__delay-1s' : ''}/>
                <span>Project / General</span>
              </div>
              <div className={contactType === 'Work together' ? styles.formTopIndividualActive : styles.formTopIndividual} onClick={() => {
                setContactType('Work together');
                setContactSubText('You have a great project idea? You need my help to make it happen? I am here to help. Contact me and lets make this project a reality.');
                setContactHelperText('Hi there, I would like to work with you on a project that is...');
              }}>
                <Image src={'/collab.png'} alt='need project?' height={40} width={40} className={P4_active ? 'animate__animated animate__flip animate__delay-1s' : ''}/>
                <span>Work together</span>
              </div>
              <div className={contactType === 'Hire me' ? styles.formTopIndividualActive : styles.formTopIndividual} onClick={() => {
                setContactType('Hire me');
                setContactSubText('Are you fascinated with what I do? Please let me know if I can fill a role in your company. Leave me a message or check my socials below.');
                setContactHelperText('Hi there, I am interested in your profile/skills and would potentially hire you for...');
              }}>
                <Image src={'/office.png'} alt='need project?' height={40} width={40} className={P4_active ? 'animate__animated animate__flip animate__delay-1s' : ''}/>
                <span>Hire me</span>
              </div>
            </div>

            <div className={styles.formBottomParent}>
              <span className={styles.formBottomH1}>{contactType}</span>
              <span className={styles.formBottomSpan}>{contactSubText}</span>
              <div className={styles.formBottomFrame}>
                <div className={styles.formFieldsParent}>
                  <div>
                    <TextField id="contact-name" label="Name*" variant="outlined" sx={{mb: '20px'}} value={contactName} onChange={(e) => setContactName(e.target.value)}/>
                    <TextField id="contact-email" label="Email*" variant="outlined" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}/>
                  </div>
                  <div>
                    <TextField id="contact-msg" label="Your message*" variant="outlined" multiline className='oop-m3' value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} placeholder={contactHelperText}/>
                  </div>
                </div>
                <LoadingButton  variant="contained" sx={{'background': '#A06CD5', m: '8px', ':hover': {'background': '#A06CD5'}}} disabled={submitted} loading={submitted} onClick={() => sendMessage()}>Send</LoadingButton >
              </div>
            </div>

            <div className={styles.socialsRoot}>
              <Link href={'https://www.linkedin.com/in/dafov/'} target='_blank'>
                <div className={styles.socialsIndividual}>
                  <Image src={'/linkedin.png'} alt='linkedin' height={20} width={20} />
                  <span>in/dafov/</span>
                </div>
              </Link>
            
              <Link href={'mailto:contact@kdafov.com'} target='_blank'>
                <div className={styles.socialsIndividual}>
                  <Image src={'/email.png'} alt='mail' height={30} width={30} />
                  <span>contact@kdafov.com</span>
                </div>
              </Link>
              <div className={styles.socialsIndividual}>
                {!cvReq ? (
                  <div onClick={() => setCVreq(true)} className={styles.socialsCVContainer}>
                    <Image src={'/cv.png'} alt='cv' height={23} width={28} />
                    <span>CV</span>
                  </div>
                ) : (
                  <div className={styles.socialsCVSecond}>
                    <TextField id="cv-email" label="Email*" variant="outlined" value={emailForCV} size='small' onChange={(e) => {setEmailForCV(e.target.value)}} sx={{'background': 'white', 'borderRadius': '3px'}}/>
                    <Button variant='contained' size='small' sx={{ml: '8px'}} onClick={() => sendCVRequest()}>GO</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </section>
      </main>

      <Footer contentToBeAdded_R={
        <div className={styles.sliderParent}>
          <section onClick={ () => document.getElementById('s1hp').scrollIntoView({behavior: 'smooth'}) }>
            <div className={P1_active ? styles.on : styles.off}></div>
            <span>Who</span>
          </section>

          <section onClick={ () => document.getElementById('s2hp').scrollIntoView({behavior: 'smooth'}) }>
            <div className={P2_active ? styles.on : styles.off}></div>
            <span>What</span>
          </section>

          <section onClick={ () => document.getElementById('s3hp').scrollIntoView({behavior: 'smooth'}) }>
            <div className={P3_active ? styles.on : styles.off}></div>
            <span>How</span>
          </section>

          <section onClick={ () => document.getElementById('s4hp').scrollIntoView({behavior: 'smooth'}) }>
            <div className={P4_active ? styles.on : styles.off}></div>
            <span>When</span>
          </section>
        </div>
      } />
      
      <div className={overlayReviews ? styles.overlayReviews : styles.overlayReviewsOff}>
        <div>
          <div className={styles.overlayCloseBtn}>
            <span>Add your experience</span>
            <IconButton aria-label="delete" sx={{mb: '20px'}} onClick={() => setOverlayReviews((current) => !current)}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles.overlayCnt}>
            <TextField id="rew-name" label="Name / Company" variant="outlined" placeholder='John Smith' size='small' sx={{mb: '15px'}} value={reviewName} onChange={(e) => setReviewName(e.target.value)} />
            <TextField id="rew-rel" label="Relation" variant="outlined" placeholder='Software Engineer' size='small' sx={{mb: '15px'}} value={reviewRelation} onChange={(e) => setReviewRelation(e.target.value)} />
            <TextField id="rew-txt" label="Experience" variant="outlined" multiline sx={{mb: '30px'}} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <Button variant="outlined" onClick={() => addNewReview()}>Add experience</Button>
          </div>
        </div>
      </div>

      <Snackbar open={showAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertContent}
        </Alert>
      </Snackbar>
    </section>

  )
}