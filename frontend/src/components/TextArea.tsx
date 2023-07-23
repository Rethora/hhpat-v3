interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelprops: { label: string; className?: string };
  id: string;
  error?: boolean;
  errortext?: string;
  helpertext?: string;
}

export const TextArea = (props: ITextAreaProps) => (
  <div>
    <label className={props.labelprops.className} htmlFor={props.id}>
      {props.labelprops.label}
    </label>
    <br />
    <textarea
      {...props}
      className={
        props.className +
        " input-shadow h-40 resize-none rounded-lg border-2 border-solid px-2 focus:outline-neutral"
      }
    />
    {props.error ? (
      <div className="text-negative">{props.errortext}</div>
    ) : (
      props.helpertext && <div>{props.helpertext}</div>
    )}
  </div>
);
