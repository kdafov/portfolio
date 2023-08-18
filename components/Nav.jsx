import styles from '@/styles/Nav.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Nav() {
    const router = useRouter();

    return(
        <>
        <nav className={styles.nav}>
            <Link href={'/'}><Image src={'/logo.png'} alt='Logo' width={75} height={75}/></Link>
            <div>
                <Link href={'/projects'} className={styles.hoverLink}>projects</Link>
                <Link href={router.pathname.includes('/projects') ? '/#s4hp' : '#s4hp'}><button className={styles.contactBtn}>get in touch</button></Link>
            </div>
        </nav>
        </>
    )
}