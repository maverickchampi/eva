import styles from "../../assets/scss/components/_faq.scss";

export function Accordion({title, description}){
    return (
        <div className="contentBx">
                <div className="label">{title}</div>
                <div className="content">
                    <p>{description}</p>
                </div>
        </div>
    );
}