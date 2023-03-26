const Textarea = (props: {
  placeholder?: string;
  maxLength?: number;
  onChange?: () => void;
  value?: string;
}) => {
  return (
    <div className="w-full">
      <textarea
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="w-full pl-5 pt-3 pr-3 pb-3 rounded-[8px] border-2 border-[#3F7B70] placeholder-pp-skypale-green outline-none resize-none text-sm"
        rows={5}
        maxLength={props.maxLength}
      />
      <div className="text-right">
        <label className="text-xs text-[#9f9f9f]">
          {props?.value?.length ?? "0"}/{props.maxLength}
        </label>
      </div>
    </div>
  );
};

export default Textarea;
