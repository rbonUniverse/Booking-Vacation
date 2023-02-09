import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import vacationsService from '../../../../Services/VacationsService';
import Header from '../../../LayoutArea/Header/Header';
import { useEffect, useState } from 'react';
import "./Reports.css";

type Entry = {
    name: string;
    sum: number;
}

function Reports(): JSX.Element {

    const [data, setData] = useState<Entry[]>([]);
    const getData = async () => {
        const vacations = await vacationsService.getAllVacations();
        let entries = await Promise.all(vacations.map(async (v) => {
            const entry: Entry = {
                name: v.destination,
                sum: (await vacationsService.getVacationSum(v.vacationId))
            };
            return entry;
        }));
        setData(entries);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="Reports">
            <header>
                <Header />
            </header>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={800}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={70}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 38, right: 36 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="sum" fill="#196380" />
                </BarChart>
            </ResponsiveContainer>
            <footer>
            </footer>
        </div>
    );
}

export default Reports;