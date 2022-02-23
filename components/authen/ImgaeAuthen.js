import Image from 'next/image'
import styles from '../../styles/authen.module.css'
export default function ImageAuthen(){
  return(
    <>
<Image className={styles.imgAuthen} src="/assets/icon/452x582-01.png" layout="fill" />
    </>
  )
}