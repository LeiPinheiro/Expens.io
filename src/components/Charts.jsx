import { PieChart } from 'recharts'
import styles from './modules/Charts.module.css'
import SimpleBarChart from './SimpleBarChart'
import PizzaChart from './PizzaChart'



function Charts() {
    return (
        <div className={styles.mainSection}>
            <div className={styles.topChartsContainer}>
                <div className={styles.barChartContainer}>
                    <p>Bar Chart</p>
                    <SimpleBarChart />
                </div>
                <div className={styles.pieChartContainer}>
                    <p>Pie Chart</p>
                    <PizzaChart />
                </div>
            </div>
        </div>
    )
}

export default Charts