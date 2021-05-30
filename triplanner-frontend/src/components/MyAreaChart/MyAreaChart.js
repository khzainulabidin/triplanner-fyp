import {Area, AreaChart, Tooltip, XAxis} from "recharts";

const MyAreaChart = ({data, dataKey}) => {
    return(
        <AreaChart
            width={550}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <XAxis dataKey="name" style={{fontSize: '75%'}} />
            <Tooltip />
            <Area type="monotone" dataKey={dataKey} fill='#04B6A9' stroke='#3236A7' />
        </AreaChart>
    );
}

export default MyAreaChart;
