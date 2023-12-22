
const Input = ({clasname}:IProps) => {
    return (
        <input className={clasname} type="text" />
    )
}

type IProps = {
    icon?: any;
    clasname?: string;
  };
export {Input}