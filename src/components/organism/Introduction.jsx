import icon from "../../assets/images/company_icon.png";
import img from "../../assets/images/introduction_photo.png";
import styles from "../../assets/scss/components/_introduction.scss";

export function Introduction() {
  return (
    <div>

        <div className="product-details">

          <img src={icon} alt="company_icon" />
          <h1>¿QUIENES SOMOS?</h1>
          <p className="text-break">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book. It has survived not only five centuries, but also the leap into
             electronic typesetting, remaining essentially unchanged.
          </p>

        </div>

        <img className="image" src={img} alt="teamwork_eva"/>

    </div>
  );
}
