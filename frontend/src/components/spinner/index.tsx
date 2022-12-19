import styles from './spinner.module.css';

const Spinner = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.spinner}>
				<div className={styles.spinner1}></div>
				<div className={styles.spinner2}></div>
				<div className={styles.spinner3}></div>
			</div>
		</div>
	);
};

export default Spinner;
