
const Button = ({clasname,text,disabled,onClick}:IProps) => {
    return (
        <button className={clasname} onClick={onClick} disabled={disabled}>{text}</button>
    );
}

type IProps = {
    onClick?: () => void;
    icon?: any;
    text?: string;
    disabled?: boolean;
    clasname?: string;
  };

export {Button}
