"use client";

import { useAlgorandIndexerService } from "@/libs/algorand/hooks";
import { IApp, IBox } from "@/libs/algorand/interface";
import { FC, Suspense, useState } from "react";
import { BasicInfo } from "./basic-info";
import { Boxes } from "./boxes";
import { Error } from "./error";
import { SearchCard } from "./search-card";
import { Transactions } from "./transactions";

export const Whisperer: FC = () => {
  const [loading, setLoading] = useState(false);
  const [app, setApp] = useState<IApp | null>(null);
  const [boxes, setBoxes] = useState<IBox[]>([]);
  const [error, setError] = useState("");
  const indexerService = useAlgorandIndexerService();

  const handleSearch = async (appId: string) => {
    if (appId.trim() === "") return;

    setLoading(true);
    setError("");
    setApp(null);
    setBoxes([]);

    const app = await indexerService.getApp(Number(appId));

    if ("error" in app) {
      setError(app.error);
    } else {
      setApp(app);
      handleGetBoxes(appId);
    }

    setLoading(false);
  };

  const handleGetBoxes = async (appId: string) => {
    if (appId.trim() === "") return;

    const boxes = await indexerService.getAppBoxes(Number(appId));

    setBoxes(boxes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 px-4 py-10">
      <Suspense
        fallback={<div className="text-white text-center">Loading...</div>}
      >
        <SearchCard
          loading={loading}
          showResults={app !== null}
          onSubmit={handleSearch}
        />
      </Suspense>

      <BasicInfo app={app} loading={loading} />

      {app && boxes.length > 0 && <Boxes boxes={boxes} />}

      {app && <Transactions appId={Number(app.id)} />}

      <Error error={error} loading={loading} />
    </div>
  );
};
