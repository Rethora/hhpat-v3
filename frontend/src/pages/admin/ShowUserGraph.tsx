import { Center } from "components/Center";
import { Checkbox } from "components/Checkbox";
import { Loading } from "components/Loading";
import { selectUserById } from "features/user/userSlicer";
import { useAppSelector } from "hooks/useAppSelector";
import React from "react";
import { useParams } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ELoadingStatus, IEntry } from "types";

const cleanData = (entries: IEntry[] | undefined) => {
  if (!entries) {
    return [];
  }

  return entries.map(entry => {
    const date = new Date(entry.created_at);
    const formattedDate = `${date.getMonth()}/${date.getDay()}`;
    return {
      ...entry,
      created_at: formattedDate,
    };
  });
};

interface IShowLineState {
  weight: boolean;
  height: boolean;
  systolic: boolean;
  diastolic: boolean;
  blood_glucose: boolean;
  resting_metabolic_rate: boolean;
  cholesterol: boolean;
  low_density_lipoprotein: boolean;
  high_density_lipoprotein: boolean;
  triglycerides: boolean;
  vo2: boolean;
  sleep_score: boolean;
  stress_score: boolean;
}

const initialShowLineState: IShowLineState = {
  weight: true,
  height: false,
  systolic: true,
  diastolic: true,
  blood_glucose: true,
  resting_metabolic_rate: false,
  cholesterol: true,
  low_density_lipoprotein: true,
  high_density_lipoprotein: true,
  triglycerides: true,
  vo2: true,
  sleep_score: true,
  stress_score: true,
};

export const ShowUserGraph = () => {
  const { userId } = useParams();
  const user = useAppSelector(state =>
    selectUserById(state, userId ? +userId : -1)
  );
  const fetchEntriesByUserIdLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchEntriesByUserId.status
  );
  const fetchUsersLoadingStatus = useAppSelector(
    state => state.users.loadingStatus.fetchUsers.status
  );
  const [showLine, setShowLine] = React.useReducer(
    (prevState: IShowLineState, updatedProperty: Partial<IShowLineState>) => ({
      ...prevState,
      ...updatedProperty,
    }),
    initialShowLineState
  );
  const cleanedData = React.useMemo(() => {
    if (!user) {
      return [];
    }
    return cleanData(user.entries);
  }, [user]);

  const handleShowLineChange = React.useCallback(
    (key: keyof IShowLineState) => {
      setShowLine({ [key]: !showLine[key] });
    },
    [showLine]
  );

  if (
    fetchUsersLoadingStatus === ELoadingStatus.PENDING ||
    fetchEntriesByUserIdLoadingStatus === ELoadingStatus.PENDING
  ) {
    return (
      <Center>
        <Loading />
      </Center>
    );
  }

  if (!user) {
    return (
      <Center>
        <React.Fragment>User Not Found</React.Fragment>
      </Center>
    );
  }

  if (!user.entries || user.entries.length === 0) {
    return (
      <Center>
        <React.Fragment>No Entries Yet</React.Fragment>
      </Center>
    );
  }

  return (
    <div>
      <div className="mt-10 h-[600px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={cleanedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="created_at" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="height"
              hide={!showLine.height}
              stroke="#04A777"
            />
            <Line
              type="monotone"
              dataKey="weight"
              hide={!showLine.weight}
              stroke="#D90368"
            />
            <Line
              type="monotone"
              dataKey="systolic"
              hide={!showLine.systolic}
              stroke="#880D1E"
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              hide={!showLine.diastolic}
              stroke="#00C49A"
            />
            <Line
              type="monotone"
              dataKey="blood_glucose"
              hide={!showLine.blood_glucose}
              stroke="#A6D49F"
            />
            <Line
              type="monotone"
              dataKey="resting_metabolic_rate"
              hide={!showLine.resting_metabolic_rate}
              stroke="#0C79AC"
            />
            <Line
              type="monotone"
              dataKey="cholesterol"
              hide={!showLine.cholesterol}
              stroke="#E54F6D"
            />
            <Line
              type="monotone"
              dataKey="low_density_lipoprotein"
              hide={!showLine.low_density_lipoprotein}
              stroke="#948D9B"
            />
            <Line
              type="monotone"
              dataKey="high_density_lipoprotein"
              hide={!showLine.high_density_lipoprotein}
              stroke="#E899DC"
            />
            <Line
              type="monotone"
              dataKey="triglycerides"
              hide={!showLine.triglycerides}
              stroke="#6C6EA0"
            />
            <Line
              type="monotone"
              dataKey="vo2"
              hide={!showLine.vo2}
              stroke="#696D7D"
            />
            <Line
              type="monotone"
              dataKey="sleep_score"
              hide={!showLine.sleep_score}
              stroke="#F8E16C"
            />
            <Line
              type="monotone"
              dataKey="stress_score"
              hide={!showLine.stress_score}
              stroke="#FB8F67"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div className="m-auto flex max-w-4xl flex-wrap justify-evenly">
          <div className="mx-8">
            <Checkbox
              id="height"
              label="height"
              checked={showLine.height}
              onChange={() => {
                handleShowLineChange("height");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="weight"
              label="weight"
              checked={showLine.weight}
              onChange={() => {
                handleShowLineChange("weight");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="systolic"
              label="systolic"
              checked={showLine.systolic}
              onChange={() => {
                handleShowLineChange("systolic");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="diastolic"
              label="diastolic"
              checked={showLine.diastolic}
              onChange={() => {
                handleShowLineChange("diastolic");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="blood_glucose"
              label="blood_glucose"
              checked={showLine.blood_glucose}
              onChange={() => {
                handleShowLineChange("blood_glucose");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="resting_metabolic_rate"
              label="resting_metabolic_rate"
              checked={showLine.resting_metabolic_rate}
              onChange={() => {
                handleShowLineChange("resting_metabolic_rate");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="cholesterol"
              label="cholesterol"
              checked={showLine.cholesterol}
              onChange={() => {
                handleShowLineChange("cholesterol");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="low_density_lipoprotein"
              label="low_density_lipoprotein"
              checked={showLine.low_density_lipoprotein}
              onChange={() => {
                handleShowLineChange("low_density_lipoprotein");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="high_density_lipoprotein"
              label="high_density_lipoprotein"
              checked={showLine.high_density_lipoprotein}
              onChange={() => {
                handleShowLineChange("high_density_lipoprotein");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="triglycerides"
              label="triglycerides"
              checked={showLine.triglycerides}
              onChange={() => {
                handleShowLineChange("triglycerides");
              }}
            />
          </div>
          <Checkbox
            id="vo2"
            label="vo2"
            checked={showLine.vo2}
            onChange={() => {
              handleShowLineChange("vo2");
            }}
          />
          <div className="mx-8">
            <Checkbox
              id="sleep_score"
              label="sleep_score"
              checked={showLine.sleep_score}
              onChange={() => {
                handleShowLineChange("sleep_score");
              }}
            />
          </div>
          <div className="mx-8">
            <Checkbox
              id="stress_score"
              label="stress_score"
              checked={showLine.stress_score}
              onChange={() => {
                handleShowLineChange("stress_score");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
