
const Input = ({clasname,value,placeholder,type,checked,handleInputChange}:IProps) => {
    return (
        <input className={clasname} onChange={handleInputChange} value={value} checked={checked} placeholder={placeholder} type={type} />
    )
}

type IProps = {
    icon?: any;
    clasname?: string;
    value?: string;
    placeholder?: string;
    type?: string;
    checked?: boolean;
    handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
export {Input}