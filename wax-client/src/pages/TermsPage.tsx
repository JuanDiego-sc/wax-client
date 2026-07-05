import { Link } from 'react-router';
import { routePaths } from '@/routes/routePaths';

const LAST_UPDATED = '2 de julio de 2026';

type LegalSection = {
  kicker: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  closing?: string[];
};

const LEGAL_SECTIONS: LegalSection[] = [
  {
    kicker: '1. Responsable',
    title: 'Quiénes somos y cómo contactarnos.',
    paragraphs: [
      'WAX es una marca ecuatoriana de impresión 3D, con domicilio en Quito, Ecuador, que diseña y produce accesorios únicos bajo pedido y por catálogo. Para efectos de la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP), WAX actúa como responsable del tratamiento de los datos personales que recoge a través de este sitio.',
      'Para cualquier consulta sobre estos términos o sobre tus datos personales puedes escribirnos a hello@waxatelier.com o abrir un ticket en la sección de Soporte.',
    ],
  },
  {
    kicker: '2. Aceptación',
    title: 'Cómo y cuándo aceptas estos términos.',
    paragraphs: [
      'Al completar el registro de tu cuenta —es decir, al llenar tus datos personales y de facturación y marcar las casillas de aceptación— declaras haber leído y aceptado estos Términos y Condiciones, la Política de Privacidad y el Aviso de Uso de Inteligencia Artificial.',
      'La aceptación queda asociada a tu cuenta: una vez completado el registro, tu cuenta pasa a estado verificado y no volveremos a solicitarte esta aceptación, salvo que estos términos cambien de forma sustancial.',
    ],
  },
  {
    kicker: '3. Servicios',
    title: 'Qué ofrece WAX.',
    items: [
      'Venta de accesorios impresos en 3D disponibles en el catálogo, con envío desde Quito, Ecuador, a todo el mundo.',
      'Atelier AI: un servicio de diseño asistido por inteligencia artificial en el que describes una pieza, iteras bocetos y modelos 3D, y solicitas una cotización para su producción artesanal.',
      'Soporte postventa mediante tickets y chat para el seguimiento de pedidos y solicitudes.',
    ],
  },
  {
    kicker: '4. Cuenta y registro',
    title: 'Tus responsabilidades sobre la cuenta.',
    items: [
      'Debes proporcionar información veraz, exacta y actualizada al registrarte y al completar tu perfil de facturación.',
      'Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de toda actividad realizada desde tu cuenta.',
      'Algunas funciones (Atelier AI, carrito, checkout, soporte) requieren una cuenta con el registro completo.',
    ],
  },
  {
    kicker: '5. Precios y pagos',
    title: 'Cómo se calculan y procesan los pagos.',
    items: [
      'Los precios se muestran en la moneda indicada en el sitio e incluyen el desglose de impuestos aplicables (IVA 15% en Ecuador) durante el checkout.',
      'Los pagos con tarjeta se procesan a través de Stripe; WAX no almacena los números de tu tarjeta en sus servidores.',
      'Las piezas del Atelier se pagan una vez aprobada la cotización por parte de WAX y aceptada por ti.',
    ],
  },
  {
    kicker: '6. Envíos y devoluciones',
    title: 'Entrega de tus piezas.',
    paragraphs: [
      'Enviamos a todo el mundo desde Quito. Los tiempos de despacho y las condiciones de entrega se detallan en la sección de Envíos y entregas de la página Maison. Por tratarse de piezas producidas a demanda y personalizadas, los encargos del Atelier no admiten devolución salvo defecto de fabricación.',
    ],
  },
  {
    kicker: '7. Datos personales',
    title: 'Política de privacidad (LOPDP).',
    paragraphs: [
      'Tratamos tus datos personales conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador (Registro Oficial, 26 de mayo de 2021). Recogemos los datos que nos entregas al registrarte y completar tu perfil: nombre y apellido, tipo y número de identificación, teléfono, correo electrónico y dirección de facturación y envío.',
      'Usamos estos datos con las siguientes finalidades:',
    ],
    items: [
      'Gestionar tu cuenta y verificar tu identidad.',
      'Procesar pedidos, pagos, facturación y envíos.',
      'Atender tus cotizaciones del Atelier y tus solicitudes de soporte.',
      'Enviarte comunicaciones transaccionales (confirmaciones de pedido, cambios de estado, respuestas de soporte).',
    ],
    closing: [
      'La base que legitima este tratamiento es tu consentimiento expreso y la ejecución del contrato de compra o encargo. Conservamos tus datos mientras tu cuenta esté activa o mientras existan obligaciones legales (tributarias o contables) que exijan conservarlos.',
      'Como titular puedes ejercer en cualquier momento tus derechos de acceso, rectificación y actualización, eliminación, oposición, portabilidad y suspensión del tratamiento, escribiendo a hello@waxatelier.com. También tienes derecho a presentar reclamos ante la Superintendencia de Protección de Datos Personales del Ecuador.',
      'Para operar el servicio compartimos datos con encargados y terceros que actúan bajo sus propias garantías de seguridad: Stripe (pagos), Cloudinary (almacenamiento de imágenes y modelos 3D), Resend (correos transaccionales), OpenAI (asistente conversacional del Atelier) y Meshy AI (generación de modelos 3D). Algunos de estos proveedores procesan datos en servidores ubicados fuera del Ecuador; al aceptar esta política autorizas dicha transferencia internacional, limitada a lo necesario para prestar el servicio.',
    ],
  },
  {
    kicker: '8. Uso de inteligencia artificial',
    title: 'Aviso de transparencia de IA.',
    paragraphs: [
      'El Atelier AI utiliza sistemas de inteligencia artificial generativa: un asistente conversacional que te ayuda a definir tu pieza y motores de generación que producen bocetos y modelos 3D a partir de tus descripciones o imágenes de referencia. Cuando conversas con el asistente estás interactuando con un sistema automatizado, no con una persona.',
    ],
    items: [
      'Los textos que escribes y las imágenes de referencia que subes al Atelier se envían a proveedores externos de IA (OpenAI y Meshy AI) exclusivamente para generar tus diseños.',
      'Los contenidos generados por IA pueden contener imprecisiones; los bocetos y modelos son propuestas de diseño, no el producto final.',
      'Toda cotización y toda pieza pasan por revisión humana del equipo WAX antes de producirse: la IA asiste el diseño, la decisión final siempre es de personas.',
      'Puedes solicitar información sobre este tratamiento automatizado o pedir revisión humana de cualquier resultado escribiendo a hello@waxatelier.com.',
    ],
    closing: [
      'Este aviso se emite en cumplimiento del deber de transparencia de la LOPDP sobre tratamientos automatizados y en línea con el Proyecto de Ley Orgánica de Regulación y Promoción de la Inteligencia Artificial que se tramita en la Asamblea Nacional del Ecuador.',
    ],
  },
  {
    kicker: '9. Propiedad intelectual',
    title: 'Diseños, marca y contenidos.',
    items: [
      'La marca WAX, el sitio y sus contenidos editoriales son propiedad de WAX.',
      'Los modelos y bocetos generados en el Atelier a partir de tus ideas se usan para producir tu pieza; WAX puede conservarlos como parte del historial de tu encargo.',
      'No puedes usar el sitio para generar contenidos ilícitos, ofensivos o que infrinjan derechos de terceros.',
    ],
  },
  {
    kicker: '10. Cambios y ley aplicable',
    title: 'Modificaciones y jurisdicción.',
    paragraphs: [
      'WAX puede actualizar estos términos; si el cambio es sustancial, te lo notificaremos y solicitaremos nuevamente tu aceptación. Estos términos se rigen por las leyes de la República del Ecuador y cualquier controversia se someterá a los jueces competentes de Quito.',
    ],
  },
];

export const TermsPage = () => (
  <section className="maison-page legal-page">
    <header className="maison-header">
      <span className="maison-kicker">Legal</span>
      <h1 className="maison-title">
        Términos, <em>privacidad</em> y uso de IA.
      </h1>
      <p className="maison-lead">
        Este documento reúne los Términos y Condiciones de WAX, nuestra Política de Privacidad
        conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador y el Aviso de
        Uso de Inteligencia Artificial del Atelier.
      </p>
      <p className="legal-updated">Última actualización: {LAST_UPDATED}</p>
    </header>

    {LEGAL_SECTIONS.map((section) => (
      <section key={section.kicker} className="maison-section legal-section">
        <span className="maison-section-kicker">{section.kicker}</span>
        <h2 className="maison-section-title">{section.title}</h2>
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph} className="maison-paragraph">{paragraph}</p>
        ))}
        {section.items ? (
          <ul className="legal-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {section.closing?.map((paragraph) => (
          <p key={paragraph} className="maison-paragraph">{paragraph}</p>
        ))}
      </section>
    ))}

    <section className="maison-cta legal-cta">
      <span className="maison-cta-kicker">¿Dudas sobre este documento?</span>
      <h2 className="maison-cta-title">Estamos para ayudarte.</h2>
      <p className="maison-cta-body">
        Escríbenos a hello@waxatelier.com o abre un ticket y el equipo WAX te responderá.
      </p>
      <div className="maison-cta-actions">
        <Link to={routePaths.support} className="maison-cta-primary">Ir a Soporte</Link>
        <Link to={routePaths.home} className="maison-cta-secondary">Volver al inicio</Link>
      </div>
    </section>
  </section>
);
