
const Input = ({clasname,value,placeholder,handleInputChange}:IProps) => {
    return (
        <input className={clasname} onChange={handleInputChange} value={value} placeholder={placeholder} type="text" />
    )
}

type IProps = {
    icon?: any;
    clasname?: string;
    value?: string;
    placeholder?: string;
    handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
export {Input}