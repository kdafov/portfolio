import styles from '@/styles/Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer({ contentToBeAdded_R }) {
    return(
        <footer className={styles.footer}>
            <Link href={'https://github.com/kdafov'} target='_blank'><Image src={'github.svg'} alt='GitHub Logo' height={30} width={30}/></Link>
            { contentToBeAdded_R }
        </footer>
    )
}