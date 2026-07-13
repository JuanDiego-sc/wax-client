import { Link } from 'react-router';
import { routePaths } from '@/routes/routePaths';

const LAST_UPDATED = '4 de julio de 2026';

type LegalSection = {
  kicker: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  closing?: string[];
};

const LEGAL_SECTIONS: LegalSection[] = [
  {
    kicker: '1. Responsable del tratamiento',
    title: 'Quiénes somos y cómo contactarnos.',
    paragraphs: [
      'WAX es una marca ecuatoriana de impresión 3D, con domicilio en Quito, Ecuador, que diseña y produce accesorios únicos bajo pedido y por catálogo. Para efectos de la Ley Orgánica de Protección de Datos Personales del Ecuador (en adelante, la "LOPDP"), WAX actúa como responsable del tratamiento de los datos personales que recoge a través de este sitio (en adelante, los "DATOS").',
      'Para cualquier consulta sobre estos términos o sobre tus DATOS puedes escribirnos al correo electrónico wax.shop.ec@gmail.com o abrir un ticket en la sección de Soporte.',
    ],
  },
  {
    kicker: '2. Aceptación y consentimiento',
    title: 'Cómo y cuándo aceptas estos términos.',
    paragraphs: [
      'Al completar el registro de tu cuenta, es decir, al llenar tus datos personales y de facturación y marcar las casillas de aceptación, declaras que has leído este documento y que autorizas de manera libre, expresa, voluntaria e informada: (i) los Términos y Condiciones de uso del sitio; (ii) el tratamiento de tus DATOS conforme a la Política de Privacidad contenida en este documento; y (iii) el uso de sistemas de inteligencia artificial descrito en el Aviso de Uso de Inteligencia Artificial.',
      'La aceptación queda asociada a tu cuenta con fecha y versión del documento. Una vez completado el registro, tu cuenta pasa a estado verificado y no volveremos a solicitarte esta aceptación, salvo que estos términos cambien de forma sustancial, en cuyo caso te lo notificaremos y solicitaremos una nueva aceptación.',
    ],
  },
  {
    kicker: '3. Definiciones',
    title: 'Qué entendemos por tratamiento de datos.',
    paragraphs: [
      'Para efectos de esta autorización se entiende por "tratamiento" cualquier operación o conjunto de operaciones realizadas sobre tus DATOS, por procedimientos automatizados, parcialmente automatizados o no automatizados, tales como: recogida, registro, organización, estructuración, conservación, custodia, adaptación, modificación, extracción, consulta, utilización, comunicación, transferencia, limitación, supresión o destrucción de los DATOS.',
      'Se entiende por "titular" a la persona natural cuyos datos son objeto de tratamiento, y por "encargado" al tercero que trata DATOS por cuenta de WAX para prestar el servicio.',
    ],
  },
  {
    kicker: '4. Servicios',
    title: 'Qué ofrece WAX.',
    items: [
      'Venta de accesorios impresos en 3D disponibles en el catálogo, con envío desde Quito, Ecuador, a todo el mundo.',
      'Atelier AI: un servicio de diseño asistido por inteligencia artificial en el que describes una pieza, iteras bocetos y modelos 3D, y solicitas una cotización para su producción artesanal.',
      'Soporte postventa mediante tickets y chat para el seguimiento de pedidos y solicitudes.',
    ],
  },
  {
    kicker: '5. Cuenta, registro y veracidad',
    title: 'Tus responsabilidades sobre la cuenta.',
    items: [
      'Debes proporcionar información veraz, exacta y actualizada al registrarte y al completar tu perfil de facturación, y comunicar oportunamente cualquier variación de la misma.',
      'WAX no será responsable de los efectos derivados del procesamiento de datos erróneos, desactualizados o inexactos proporcionados por el titular, y podrá suspender la prestación del servicio mientras la información no sea corregida.',
      'Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de toda actividad realizada desde tu cuenta.',
      'Algunas funciones (Atelier AI, carrito, checkout, soporte) requieren una cuenta con el registro completo.',
    ],
  },
  {
    kicker: '6. Precios y pagos',
    title: 'Cómo se calculan y procesan los pagos.',
    items: [
      'Los precios se muestran en la moneda indicada en el sitio e incluyen el desglose de impuestos aplicables (IVA 15% en Ecuador) durante el checkout.',
      'Los pagos con tarjeta se procesan a través de Stripe; WAX no almacena los números de tu tarjeta en sus servidores.',
      'Las piezas del Atelier se pagan una vez aprobada la cotización por parte de WAX y aceptada por ti.',
    ],
  },
  {
    kicker: '7. Envíos y devoluciones',
    title: 'Entrega de tus piezas.',
    paragraphs: [
      'Enviamos a todo el mundo desde Quito. Los tiempos de despacho y las condiciones de entrega se detallan en la sección de Envíos y entregas de la página Maison. Por tratarse de piezas producidas a demanda y personalizadas, los encargos del Atelier no admiten devolución, salvo defecto de fabricación.',
    ],
  },
  {
    kicker: '8. Datos que tratamos y finalidades',
    title: 'Política de privacidad (LOPDP).',
    paragraphs: [
      'Tratamos tus DATOS conforme a la LOPDP (Registro Oficial, 26 de mayo de 2021). Recogemos los datos que nos entregas al registrarte y completar tu perfil: nombre y apellido, tipo y número de identificación, teléfono, correo electrónico y dirección de facturación y envío. No solicitamos ni tratamos datos sensibles.',
      'El tratamiento de tus DATOS tendrá las siguientes finalidades:',
    ],
    items: [
      'Gestionar tu cuenta, verificar tu identidad y habilitar las funciones privadas del sitio.',
      'Procesar pedidos, pagos, facturación tributaria y envíos.',
      'Atender tus cotizaciones del Atelier y tus solicitudes de soporte.',
      'Enviarte comunicaciones transaccionales relacionadas con tus pedidos y solicitudes (confirmaciones, cambios de estado, respuestas de soporte).',
    ],
    closing: [
      'La base que legitima este tratamiento es tu consentimiento expreso y la ejecución del contrato de compra o encargo. Tus DATOS no se utilizan para publicidad ni se venden a terceros.',
      'Conservaremos tus DATOS mientras tu cuenta esté activa y, una vez finalizada la relación, durante los plazos exigidos por la normativa tributaria, contable y de defensa del consumidor del Ecuador, únicamente para cumplir dichas obligaciones legales.',
    ],
  },
  {
    kicker: '9. Comunicación y transferencia a terceros',
    title: 'Con quién compartimos datos y bajo qué garantías.',
    paragraphs: [
      'Para cumplir con las finalidades descritas, tus DATOS podrán comunicarse a encargados del tratamiento que prestan servicios a WAX: Stripe (procesamiento de pagos), Cloudinary (almacenamiento de imágenes y modelos 3D), Resend (correos transaccionales), OpenAI (asistente conversacional del Atelier) y Meshy AI (generación de modelos 3D).',
      'Algunos de estos proveedores procesan datos en servidores ubicados fuera del Ecuador. Al aceptar esta política autorizas dicha transferencia internacional, limitada estrictamente a lo necesario para prestar el servicio. WAX adopta y exige a sus encargados medidas técnicas y organizativas apropiadas para garantizar la confidencialidad y seguridad de los DATOS.',
    ],
  },
  {
    kicker: '10. Derechos del titular y revocatoria',
    title: 'Qué puedes exigir y cómo.',
    paragraphs: [
      'Como titular puedes ejercer en cualquier momento y de forma gratuita tus derechos de acceso, rectificación y actualización, eliminación, oposición, portabilidad y suspensión del tratamiento, dirigiendo tu solicitud al correo wax.shop.ec@gmail.com. Responderemos dentro de los plazos previstos en la LOPDP.',
      'También tienes derecho a presentar reclamos ante la Superintendencia de Protección de Datos Personales, autoridad de control del Ecuador.',
      'Puedes revocar este consentimiento en cualquier momento por el mismo canal. La revocatoria no afecta la licitud del tratamiento realizado con anterioridad, y WAX podrá limitar o suspender los servicios cuya prestación dependa necesariamente de los DATOS cuyo tratamiento se revoca, así como conservar los datos exigidos por obligaciones legales.',
    ],
  },
  {
    kicker: '11. Uso de inteligencia artificial',
    title: 'Aviso de transparencia de IA.',
    paragraphs: [
      'El Atelier AI utiliza sistemas de inteligencia artificial generativa: un asistente conversacional que te ayuda a definir tu pieza y motores de generación que producen bocetos y modelos 3D a partir de tus descripciones o imágenes de referencia. Cuando conversas con el asistente estás interactuando con un sistema automatizado, no con una persona.',
    ],
    items: [
      'Los textos que escribes y las imágenes de referencia que subes al Atelier se envían a proveedores externos de IA (OpenAI y Meshy AI) exclusivamente para generar tus diseños.',
      'Los contenidos generados por IA pueden contener imprecisiones; los bocetos y modelos son propuestas de diseño, no el producto final.',
      'Toda cotización y toda pieza pasan por revisión humana del equipo WAX antes de producirse: la inteligencia artificial asiste el diseño, pero la decisión final siempre corresponde a personas.',
      'Puedes solicitar información sobre este tratamiento automatizado o pedir la revisión humana de cualquier resultado escribiendo a wax.shop.ec@gmail.com.',
    ],
    closing: [
      'Este aviso se emite en cumplimiento del deber de transparencia de la LOPDP sobre tratamientos automatizados y en línea con el Proyecto de Ley Orgánica de Regulación y Promoción de la Inteligencia Artificial que se tramita en la Asamblea Nacional del Ecuador.',
    ],
  },
  {
    kicker: '12. Propiedad intelectual',
    title: 'Diseños, marca y contenidos.',
    items: [
      'La marca WAX, el sitio y sus contenidos editoriales son propiedad de WAX.',
      'Los modelos y bocetos generados en el Atelier a partir de tus ideas se usan para producir tu pieza; WAX puede conservarlos como parte del historial de tu encargo.',
      'No puedes usar el sitio para generar contenidos ilícitos, ofensivos o que infrinjan derechos de terceros.',
    ],
  },
  {
    kicker: '13. Modificaciones, ley aplicable y jurisdicción',
    title: 'Cambios a este documento.',
    paragraphs: [
      'WAX puede actualizar estos términos. Si el cambio es sustancial, te lo notificaremos y solicitaremos nuevamente tu aceptación. Estos términos se rigen por las leyes de la República del Ecuador y cualquier controversia se someterá a los jueces competentes de Quito.',
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
        Este documento reúne los Términos y Condiciones de WAX, la autorización para el
        tratamiento de datos personales conforme a la Ley Orgánica de Protección de Datos
        Personales del Ecuador y el Aviso de Uso de Inteligencia Artificial del Atelier.
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
        Escríbenos a wax.shop.ec@gmail.com o abre un ticket y el equipo WAX te responderá.
      </p>
      <div className="maison-cta-actions">
        <Link to={routePaths.support} className="maison-cta-primary">Ir a Soporte</Link>
        <Link to={routePaths.home} className="maison-cta-secondary">Volver al inicio</Link>
      </div>
    </section>
  </section>
);
