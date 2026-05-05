import type { Metadata } from "next";

import { LegalLayout } from "../_components/legal-layout";

export const metadata: Metadata = {
  title: "Aviso de Privacidad · Neni",
  description:
    "Cómo neni recolecta, usa y protege tus datos personales. Aviso de Privacidad conforme a la LFPDPPP.",
};

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Aviso de Privacidad" updatedAt="4 de mayo de 2026">
      <p>
        En cumplimiento de la{" "}
        <strong>
          Ley Federal de Protección de Datos Personales en Posesión de los
          Particulares
        </strong>{" "}
        (LFPDPPP), este Aviso te explica qué datos personales recabamos, cómo
        los usamos y qué derechos tienes sobre ellos.
      </p>

      <h2>1. Identidad del responsable</h2>
      <p>
        El responsable del tratamiento de tus datos personales es{" "}
        <strong>Rafael de Jesús León Alfaro</strong>, con domicilio en{" "}
        <strong>15A Calle Sur Poniente 506, Comitán, Chiapas</strong>, México
        (en adelante, "neni"). Puedes contactarnos en{" "}
        <a href="mailto:nenisoftware@gmail.com">nenisoftware@gmail.com</a>.
      </p>

      <h2>2. Datos personales que recabamos</h2>
      <p>
        Para prestarte el servicio y dependiendo de tu rol en la plataforma,
        podemos recabar los siguientes datos:
      </p>
      <h3>De los vendedores (sellers)</h3>
      <ul>
        <li>Número de teléfono móvil con WhatsApp activo</li>
        <li>Nombre del negocio y categoría</li>
        <li>Dirección y ubicación del negocio (cuando la registres)</li>
        <li>
          Datos de facturación (RFC, razón social, dirección fiscal) si
          contratas el plan Pro
        </li>
        <li>
          Información de pago (procesada exclusivamente por nuestro proveedor
          Stripe; nosotros no almacenamos números de tarjeta)
        </li>
      </ul>
      <h3>De los compradores</h3>
      <ul>
        <li>Nombre</li>
        <li>Teléfono móvil con WhatsApp</li>
        <li>Dirección de entrega y, opcionalmente, ubicación geográfica</li>
        <li>Notas que decidas incluir en tu pedido</li>
      </ul>
      <h3>Datos técnicos</h3>
      <ul>
        <li>Dirección IP, tipo de dispositivo y navegador</li>
        <li>Páginas visitadas y tiempo de sesión</li>
        <li>Cookies estrictamente necesarias para autenticación</li>
      </ul>

      <h2>3. Finalidades del tratamiento</h2>
      <h3>Finalidades primarias (necesarias para el servicio)</h3>
      <ul>
        <li>Crear, operar y administrar tu cuenta</li>
        <li>Procesar y dar seguimiento a los pedidos</li>
        <li>
          Enviar notificaciones por WhatsApp relacionadas con tu cuenta o pedido
          (códigos de acceso, confirmaciones, cambios de estado)
        </li>
        <li>Cobrar la suscripción al plan Pro y emitir comprobantes</li>
        <li>Prevenir fraudes y abusos en la plataforma</li>
        <li>Cumplir con obligaciones legales aplicables</li>
      </ul>
      <h3>Finalidades secundarias (puedes oponerte)</h3>
      <ul>
        <li>Enviarte información sobre nuevas funciones del producto</li>
        <li>
          Realizar análisis estadísticos y mejorar el servicio (siempre con
          datos disociados)
        </li>
      </ul>
      <p>
        Si no deseas que tus datos sean tratados para las finalidades
        secundarias, escríbenos a{" "}
        <a href="mailto:nenisoftware@gmail.com">nenisoftware@gmail.com</a> y
        respetaremos tu decisión sin afectar tu acceso al servicio.
      </p>

      <h2>4. Transferencias de datos</h2>
      <p>
        Neni transfiere ciertos datos a terceros únicamente para operar el
        servicio. Todos ellos están obligados contractualmente a mantener la
        confidencialidad de tus datos:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> (Estados Unidos): hosting de la
          aplicación y almacenamiento de archivos
        </li>
        <li>
          <strong>Neon Inc.</strong> (Estados Unidos): base de datos
        </li>
        <li>
          <strong>Twilio Inc.</strong> (Estados Unidos): envío de mensajes por
          WhatsApp
        </li>
        <li>
          <strong>Stripe Payments México</strong>: procesamiento de pagos de la
          suscripción
        </li>
        <li>
          Autoridades competentes cuando exista mandamiento judicial o
          requerimiento fundado conforme a la ley
        </li>
      </ul>
      <p>
        Salvo en estos casos, neni{" "}
        <strong>no vende, alquila ni comparte</strong> tus datos personales con
        terceros para fines de marketing.
      </p>

      <h2>5. Tus derechos ARCO</h2>
      <p>Tienes derecho en todo momento a:</p>
      <ul>
        <li>
          <strong>Acceder</strong> a tus datos personales que poseemos
        </li>
        <li>
          <strong>Rectificar</strong> los que sean inexactos o incompletos
        </li>
        <li>
          <strong>Cancelar</strong> tus datos cuando ya no sean necesarios
        </li>
        <li>
          <strong>Oponerte</strong> a su tratamiento para finalidades
          secundarias
        </li>
        <li>Revocar tu consentimiento</li>
      </ul>
      <p>
        Para ejercer cualquier derecho ARCO, envíanos un correo a{" "}
        <a href="mailto:nenisoftware@gmail.com">nenisoftware@gmail.com</a>{" "}
        indicando tu nombre, número de teléfono registrado y el derecho que
        deseas ejercer. Responderemos en un plazo máximo de{" "}
        <strong>20 días hábiles</strong>.
      </p>
      <p>
        Si no quedas conforme con nuestra respuesta, puedes acudir al{" "}
        <a
          href="https://home.inai.org.mx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instituto Nacional de Transparencia, Acceso a la Información y
          Protección de Datos Personales (INAI)
        </a>
        .
      </p>

      <h2>6. Conservación de datos</h2>
      <p>
        Conservamos tus datos mientras tengas una cuenta activa y hasta{" "}
        <strong>90 días</strong> después de cancelarla, para permitirte exportar
        tu información o reactivar tu cuenta. Pasado ese plazo, los datos se
        eliminan o se anonimizan, salvo aquellos que debamos conservar por
        obligación legal (por ejemplo, comprobantes fiscales por 5 años).
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas, administrativas y físicas razonables para
        proteger tus datos contra acceso no autorizado, pérdida o alteración:
      </p>
      <ul>
        <li>Conexiones cifradas con HTTPS/TLS</li>
        <li>Contraseñas hasheadas y sesiones con tokens firmados</li>
        <li>Acceso limitado a personal autorizado</li>
        <li>Respaldo automático de la base de datos</li>
      </ul>

      <h2>8. Cookies</h2>
      <p>
        Usamos únicamente cookies estrictamente necesarias para autenticarte y
        mantener tu sesión activa. No usamos cookies de publicidad ni de
        terceros con fines de tracking. Puedes deshabilitar las cookies en tu
        navegador, pero algunas funciones de neni dejarán de operar.
      </p>

      <h2>9. Datos de menores</h2>
      <p>
        neni está dirigido a personas mayores de edad. Si descubrimos que
        recabamos datos de un menor sin consentimiento de su tutor legal, los
        eliminaremos de inmediato. Si crees que esto ha ocurrido, contáctanos.
      </p>

      <h2>10. Cambios al Aviso de Privacidad</h2>
      <p>
        Podemos actualizar este Aviso de Privacidad. Cuando haya cambios
        sustanciales, te avisaremos por correo o por la aplicación al menos con{" "}
        <strong>15 días de anticipación</strong> antes de que entren en vigor.
        La fecha de "última actualización" en la parte superior siempre refleja
        la versión vigente.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Para cualquier duda sobre este Aviso o sobre el tratamiento de tus datos
        personales, contáctanos en{" "}
        <a href="mailto:nenisoftware@gmail.com">nenisoftware@gmail.com</a>.
      </p>
    </LegalLayout>
  );
}
