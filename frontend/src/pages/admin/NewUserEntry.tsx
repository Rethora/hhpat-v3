import { Input } from "components/Input";
import { PositiveButton } from "components/PositiveButton";
import { TextArea } from "components/TextArea";
import {
  createEntryForUser,
  selectLastUserEntry,
  selectUserById,
} from "features/user/userSlicer";
import { Formik, FormikErrors } from "formik";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import React from "react";
import { useParams } from "react-router-dom";
import { IEntry } from "types";
import { formatInchesToFeetInches } from "utils/helpers";

interface IFormValues {
  weight: number | null;
  height: number | null;
  systolic: number | null;
  diastolic: number | null;
  blood_glucose: number | null;
  resting_metabolic_rate: number | null;
  cholesterol: number | null;
  low_density_lipoprotein: number | null;
  high_density_lipoprotein: number | null;
  triglycerides: number | null;
  vo2: number | null;
  sleep_score: number | null;
  stress_score: number | null;
  comments: string | null;
}

const initialValues: IFormValues = {
  weight: null,
  height: null,
  systolic: null,
  diastolic: null,
  blood_glucose: null,
  resting_metabolic_rate: null,
  cholesterol: null,
  low_density_lipoprotein: null,
  high_density_lipoprotein: null,
  triglycerides: null,
  vo2: null,
  sleep_score: null,
  stress_score: null,
  comments: null,
};

const validate = (values: IFormValues) => {
  const errors: FormikErrors<IFormValues> = {};

  return errors;
};

export const NewUserEntry = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state =>
    selectUserById(state, userId ? +userId : -1)
  );
  const lastUserEntry = useAppSelector(state =>
    selectLastUserEntry(state, user?.id || -1)
  );
  const heightDisplayRef = React.useRef<HTMLDivElement>({} as HTMLDivElement);

  const formValues = React.useMemo(() => {
    const values = initialValues;

    if (lastUserEntry) {
      values.weight = lastUserEntry.weight;
      values.height = lastUserEntry.height;
    }

    return values;
  }, [lastUserEntry]);

  if (!user) {
    return <>User Not Found</>;
  }

  const onSubmit = (values: IFormValues) => {
    if (!userId) {
      return;
    }
    const entry: Partial<IEntry> = { ...values, user: +userId };
    dispatch(createEntryForUser({ entry }));
  };

  return (
    <React.Fragment>
      <h1 className="my-4 text-center">New Entry for {user.first_name}</h1>
      <Formik
        initialValues={formValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap justify-center">
              <div className="input-with-error">
                <Input
                  labelprops={{ title: "Weight", className: "ml-2" }}
                  placeholder="Weight"
                  name="weight"
                  autoComplete="weight"
                  value={values.weight || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                  autoFocus
                />
                <span className="error-span">
                  {errors.weight && touched.weight && errors.weight}
                </span>
              </div>
              <div className="input-with-error">
                <div className="flex w-[266px] items-end justify-center">
                  <Input
                    labelprops={{ title: "Height", className: "ml-2" }}
                    placeholder="Height (in inches)"
                    name="height"
                    autoComplete="height"
                    value={values.height || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    className="mx-2 w-[185px]"
                  />
                  <div
                    ref={heightDisplayRef}
                    className="w-full pb-1 text-center font-mono"
                  >
                    {formatInchesToFeetInches(values.height || 0)}
                  </div>
                </div>
                <span className="error-span">
                  {errors.height && touched.height && errors.height}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="input-with-error">
                <Input
                  labelprops={{ title: "Systolic", className: "ml-2" }}
                  placeholder="Systolic"
                  name="systolic"
                  autoComplete="systolic"
                  value={values.systolic || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.systolic && touched.systolic && errors.systolic}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  labelprops={{ title: "Diastolic", className: "ml-2" }}
                  placeholder="Diastolic"
                  name="diastolic"
                  autoComplete="diastolic"
                  value={values.diastolic || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.diastolic && touched.diastolic && errors.diastolic}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  labelprops={{ title: "Blood Glucose", className: "ml-2" }}
                  placeholder="Blood Glucose"
                  name="blood_glucose"
                  autoComplete="blood_glucose"
                  value={values.blood_glucose || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.blood_glucose &&
                    touched.blood_glucose &&
                    errors.blood_glucose}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  labelprops={{
                    title: "Resting Metabolic Rate",
                    className: "ml-2",
                  }}
                  placeholder="Resting Metabolic Rate"
                  name="resting_metabolic_rate"
                  autoComplete="resting_metabolic_rate"
                  value={values.resting_metabolic_rate || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.resting_metabolic_rate &&
                    touched.resting_metabolic_rate &&
                    errors.resting_metabolic_rate}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="input-with-error">
                <Input
                  labelprops={{ title: "Cholesterol", className: "ml-2" }}
                  placeholder="Cholesterol"
                  autoComplete="cholesterol"
                  name="cholesterol"
                  value={values.cholesterol || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.cholesterol &&
                    touched.cholesterol &&
                    errors.cholesterol}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  labelprops={{
                    title: "Low Density Lipoprotein",
                    className: "ml-2",
                  }}
                  placeholder="Low Density Lipoprotein"
                  name="low_density_lipoprotein"
                  autoComplete="low_density_lipoprotein"
                  value={values.low_density_lipoprotein || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.low_density_lipoprotein &&
                    touched.low_density_lipoprotein &&
                    errors.low_density_lipoprotein}
                </span>
              </div>

              <div className="input-with-error">
                <Input
                  labelprops={{
                    title: "High Density Lipoprotein",
                    className: "ml-2",
                  }}
                  placeholder="High Density Lipoprotein"
                  name="high_density_lipoprotein"
                  autoComplete="high_density_lipoprotein"
                  value={values.high_density_lipoprotein || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.high_density_lipoprotein &&
                    touched.high_density_lipoprotein &&
                    errors.high_density_lipoprotein}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  labelprops={{ title: "Triglycerides", className: "ml-2" }}
                  placeholder="Triglycerides"
                  name="triglycerides"
                  autoComplete="triglycerides"
                  value={values.triglycerides || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.triglycerides &&
                    touched.triglycerides &&
                    errors.triglycerides}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="input-with-error">
                <div className="ml-2">
                  VO<sub>2</sub>
                </div>
                <Input
                  labelprops={{ title: "" }}
                  placeholder="VO2"
                  name="vo2"
                  autoComplete="vo2"
                  value={values.vo2 || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.vo2 && touched.vo2 && errors.vo2}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  labelprops={{ title: "Sleep Score", className: "ml-2" }}
                  placeholder="Sleep Score"
                  name="sleep_score"
                  autoComplete="sleep_score"
                  value={values.sleep_score || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.sleep_score &&
                    touched.sleep_score &&
                    errors.sleep_score}
                </span>
              </div>
              <div className="input-with-error">
                <Input
                  labelprops={{ title: "Stress Score", className: "ml-2" }}
                  placeholder="Stress Score"
                  name="stress_score"
                  autoComplete="stress_score"
                  value={values.stress_score || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  className="mx-2 w-[250px]"
                />
                <span className="error-span">
                  {errors.stress_score &&
                    touched.stress_score &&
                    errors.stress_score}
                </span>
              </div>
            </div>
            <div className="input-with-error mx-2 flex justify-center">
              <TextArea
                labelprops={{ title: "Comments" }}
                placeholder="Comments"
                name="comments"
                value={values.comments || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-[350px]"
              />
              <span className="error-span">
                {errors.comments && touched.comments && errors.comments}
              </span>
            </div>
            <div className="my-8 flex justify-end">
              <PositiveButton type="submit">Submit</PositiveButton>
            </div>
          </form>
        )}
      </Formik>
    </React.Fragment>
  );
};
