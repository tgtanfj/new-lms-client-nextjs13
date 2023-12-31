"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import Loader from "../../loader/loader";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

interface OrderAnalyticsProps {
  isDashboard?: boolean;
}

const OrderAnalytics = ({ isDashboard }: OrderAnalyticsProps) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.name, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isDashboard ? "h-[30vh]" : "h-screen"}`}>
          <div
            className={`${
              isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px] pl-[40px]"
            }`}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } !text-start px-5`}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>
          <div
            className={`${
              isDashboard ? "h-[90%]" : "h-[80vh]"
            } w-full flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                data={analyticsData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
