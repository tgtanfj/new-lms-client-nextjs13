import { BiBorderLeft } from "react-icons/bi";
import UserAnalytics from "../analytics/user-analytics";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../analytics/order-analytics";
import AllInvoicesMainPage from "@/app/admin/invoices/page";
import AllInvoices from "../invoice/all-invoices";
import { useEffect, useState } from "react";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

interface DashboardWidgetsProps {
  open?: boolean;
  value?: number;
}

const CircularProgresWithLabel = ({ open, value }: DashboardWidgetsProps) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const DashboardWidgets = ({ open }: DashboardWidgetsProps) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  const [comparePercentenge, setComparePercentenge] = useState();
  const [ordersComparePercentenge, setOrdersComparePercentenge] =
    useState<any>();
  const [userComparePercentenge, setUsersComparePercentenge] = useState<any>();

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const userLastTwoMonths = data.users.last12Months.slice(-2);
        const orderLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (userLastTwoMonths.length === 2 && orderLastTwoMonths.length === 2) {
          const usersCurrentMonth: any = userLastTwoMonths[1].count;
          const usersPreviousMonth: any = userLastTwoMonths[0].count;
          const ordersCurrentMonth: any = orderLastTwoMonths[1].count;
          const ordersPreviousMonth: any = orderLastTwoMonths[0].count;

          let usersPercentChange;
          let ordersPercentChange;

          if (usersPreviousMonth === 0) {
            usersPercentChange = (usersCurrentMonth - usersPreviousMonth) * 100;
          }
          if (ordersPreviousMonth === 0) {
            ordersPercentChange =
              (ordersCurrentMonth - ordersPreviousMonth) * 100;
          }

          if (ordersPreviousMonth !== 0 && ordersPreviousMonth !== 0) {
            usersPercentChange =
              ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
              100;
            ordersPercentChange =
              ((ordersCurrentMonth - ordersPreviousMonth) /
                ordersPreviousMonth) *
              100;
          }

          setUsersComparePercentenge({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });
          setOrdersComparePercentenge({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [data, ordersData, isLoading, ordersLoading]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div>
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px]">
                  {ordersComparePercentenge?.currentMonth}
                </h5>
                <h5 className="py-2 font-[400] font-Poppins dark:text-white text-black text-[20px]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgresWithLabel value={
                  ordersComparePercentenge?.percentChange > 100 ? 100 : 0
                } open={open} />
                <h5 className="text-center pt-4">
                  {ordersComparePercentenge?.percentChange > 0
                    ? "+" + ordersComparePercentenge?.percentChange.toFixed(2)
                    : "-" + ordersComparePercentenge?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px]">
                  {userComparePercentenge?.currentMonth}
                </h5>
                <h5 className="py-2 font-[400] font-Poppins dark:text-white text-black text-[20px]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgresWithLabel
                  value={userComparePercentenge?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {userComparePercentenge?.percentChange > 0
                    ? "+" + userComparePercentenge?.percentChange.toFixed(2)
                    : "-" + userComparePercentenge?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-2 pr-3 grid grid-cols-[65%,35%] mt-[-20px]">
        <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
            Recent Transaction
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
