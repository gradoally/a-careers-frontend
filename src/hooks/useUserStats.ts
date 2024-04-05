import { useState } from "react";

export interface IStats {
  freelancer: number;
  customer: number;
}

import { getUserStatus } from "@/services/profile";

export default function useUserStats() {
  const [stats, setStats] = useState<IStats>({ freelancer: 0, customer: 0 });

  function loadStats(index: number) {
    getUserStatus({ index })
      .then((res) => {
        setStats({
          freelancer: res.data?.asFreelancerTotal || 0,
          customer: res.data?.asCustomerTotal || 0,
        });
      })
      .catch((err) => {
        console.log((err as Error).message);
      });
  }

  return { stats, loadStats };
}
