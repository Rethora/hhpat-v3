interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelprops: { title: string; className?: string };
}

export const TextArea = (props: ITextAreaProps) => (
  <div>
    <label className={props.labelprops.className} htmlFor={props.name}>
      {props.labelprops.title}
    </label>
    <br />
    <textarea
      {...props}
      className={
        props.className +
        " input-shadow h-40 resize-none rounded-lg border-2 border-solid px-2 focus:outline-neutral"
      }
    />
  </div>
);
