import { Accordion } from "../atom/Accordion";
import styles from "../../assets/scss/components/_faq.scss";

export function Faq(){
    return(
        <div className="accordion">
            <Accordion title="¿Qué significa EVA?" description="Emotional virtual assistant."/>
            <Accordion title="¿Cómo nace EVA?" description="Debido a los problemas emocionales por el que gran número de personas pasan y como esto afecta en su estilo de vida, y nosotros queriendo cambiar dicha problemática." />
            <Accordion title="¿Por qué EVA?" description="Con EVA queremos lograr mostrar el significado en el nombre y con estas siglas se logró, un asistente emocional virtual." />
            <Accordion title="¿Cuál es el público objetivo?" description="Toda persona que quiera mejorar emocionalmente o necesite alguna ayuda emocional." />
            <Accordion title="¿Cuáles son los objetivos de EVA?" description="Convertirnos en la aplicación web más concurrida por jóvenes y adultos para servir de ayuda emocional en menos de 1 año. Además de incentivar sobre el concepto de salud mental." />
            <Accordion title="¿Cuáles son los servicios de EVA?" description="Dar soporte emocional por el chat. Brindar estadística de tus estados de ánimos. Mostrar un calendario de emociones. Recomendarte cosas que puedes potenciar. Ser parte de una comunidad con el mismo objetivo." />
            <Accordion title="¿EVA reemplaza a un psicólogo?" description="No, lo que buscamos con EVA es querer complementar y auxiliar, más no ser un reemplazo de un psicólogo." />
            <Accordion title="¿EVA es gratis? " description="Si, todos los servicios que tenga EVA son completamente gratis, solo necesitar registrar y ya podrás interactuar con las herramientas que brindamos." />
            <Accordion title="¿EVA da tratamientos?" description="No, siempre recomendaremos ir con un psicólogo, EVA solo buscar orientar y motivar a personas a mejorar la inteligencia emocional." />
            <Accordion title="¿EVA es un Bot que me da respuestas programadas?" description="No, pensando en ello decidimos usar machine learning que lo que hace es hacer que el Bot se adapte a partir de la información brindada por los usuarios." />
        </div>
    );
}