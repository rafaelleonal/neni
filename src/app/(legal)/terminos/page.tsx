import type { Metadata } from "next";

import { LegalLayout } from "../_components/legal-layout";

export const metadata: Metadata = {
  title: "Términos de Servicio · Neni",
  description:
    "Condiciones de uso de neni — la plataforma para vender por WhatsApp.",
};

export default function TerminosPage() {
  return (
    <LegalLayout title="Términos de Servicio" updatedAt="4 de mayo de 2026">
      <p>
        Bienvenida. Estos Términos rigen el uso de neni, una plataforma que te
        ayuda a vender por WhatsApp (en adelante, "el Servicio"). Al crear una
        cuenta o usar el Servicio, aceptas estos Términos. Si no estás de
        acuerdo, no uses neni.
      </p>

      <h2>1. Quién provee el Servicio</h2>
      <p>
        El Servicio es operado por <strong>Rafael de Jesús León Alfaro</strong>,
        con domicilio en{" "}
        <strong>15A Calle Sur Poniente 506, Comitán, Chiapas</strong>, México.
        Para contactarnos:{" "}
        <a href="mailto:nenisoftware@gmail.com">nenisoftware@gmail.com</a>.
      </p>

      <h2>2. Qué incluye el Servicio</h2>
      <p>neni te permite:</p>
      <ul>
        <li>Crear un catálogo de productos con foto, precio y descripción</li>
        <li>
          Tener un link público (<code>neni.mx/tunegocio</code>) que puedes
          compartir
        </li>
        <li>Recibir pedidos a través de ese link</li>
        <li>
          Recibir notificaciones automáticas por WhatsApp cuando llegue un
          pedido
        </li>
        <li>Cobrar por efectivo y, en plan Pro, por tarjeta, OXXO y SPEI</li>
      </ul>
      <p>
        El Servicio se proporciona "tal cual". Hacemos lo razonable para que
        funcione bien, pero no garantizamos que esté libre de interrupciones,
        errores o defectos.
      </p>

      <h2>3. Tu cuenta</h2>
      <p>Para usar neni necesitas:</p>
      <ul>
        <li>Tener al menos 18 años</li>
        <li>Un número de teléfono móvil con WhatsApp activo</li>
        <li>Aceptar estos Términos y nuestro Aviso de Privacidad</li>
      </ul>
      <p>
        Eres responsable de mantener la confidencialidad de tu cuenta y de toda
        actividad que ocurra en ella. Avísanos inmediatamente si detectas un uso
        no autorizado.
      </p>
      <p>
        Solo se permite <strong>una cuenta y un negocio por persona</strong>. Si
        necesitas más, contáctanos.
      </p>

      <h2>4. Planes y pagos</h2>
      <p>
        neni ofrece dos planes: <strong>Empezando</strong> (gratis) y{" "}
        <strong>Vendiendo</strong> ($129 MXN/mes o $1,290 MXN/año).
      </p>
      <ul>
        <li>
          El plan Empezando es <strong>gratis para siempre</strong>, sujeto a
          los límites publicados (productos, pedidos por mes, métodos de pago).
        </li>
        <li>
          El plan Vendiendo se cobra mensual o anualmente vía Stripe. La
          renovación es <strong>automática</strong> hasta que canceles.
        </li>
        <li>
          Puedes cancelar en cualquier momento desde la configuración. La
          cancelación toma efecto al final del periodo ya pagado; no
          reembolsamos por días no usados, salvo casos excepcionales que
          evaluamos caso por caso.
        </li>
        <li>
          Si actualizas de mensual a anual (o viceversa), prorrateamos la
          diferencia.
        </li>
        <li>
          Si un cobro falla, intentaremos cobrar varias veces durante 14 días.
          Si no se logra, tu cuenta pasará a plan Empezando con sus límites.
        </li>
      </ul>
      <p>
        Adicional a la suscripción, neni cobra una{" "}
        <strong>comisión sobre transacciones online</strong> (3% en plan
        Empezando, 1.5% en plan Vendiendo). Pagos en efectivo no causan
        comisión.
      </p>
      <p>
        Los precios son en pesos mexicanos e incluyen IVA. Si requieres factura
        CFDI 4.0, podemos emitirla con los datos fiscales que registres.
      </p>

      <h2>5. Tu contenido</h2>
      <p>
        Todo lo que subas a neni (fotos, descripciones, datos de tu negocio)
        sigue siendo <strong>tuyo</strong>. Nos otorgas una licencia limitada
        para mostrarlo en la plataforma con el único fin de prestarte el
        Servicio. Si cancelas tu cuenta, esa licencia termina.
      </p>
      <p>
        Eres el único responsable del contenido que publicas. Garantizas que
        tienes los derechos sobre fotos, marcas y descripciones, y que no violan
        derechos de terceros ni las leyes mexicanas.
      </p>

      <h2>6. Conducta prohibida</h2>
      <p>No puedes usar neni para:</p>
      <ul>
        <li>
          Vender productos o servicios ilegales en México (drogas, armas,
          medicamentos sin receta, fauna protegida, contenido adulto)
        </li>
        <li>
          Vender productos falsificados o que infrinjan marcas registradas
        </li>
        <li>Estafar, engañar o dañar a clientes o terceros</li>
        <li>Enviar spam o mensajes no solicitados</li>
        <li>
          Hackear, hacer ingeniería inversa o intentar romper la seguridad del
          Servicio
        </li>
        <li>Suplantar a otra persona o negocio</li>
        <li>Usar el Servicio para lavado de dinero o financiamiento ilícito</li>
      </ul>
      <p>
        Si detectamos que violaste estos puntos, podemos{" "}
        <strong>suspender o cancelar tu cuenta sin previo aviso</strong>, y en
        casos graves reportar a las autoridades competentes.
      </p>

      <h2>7. Servicios de terceros</h2>
      <p>
        neni se apoya en servicios de terceros (Vercel, Neon, Twilio, Stripe,
        Meta/WhatsApp). El uso de neni implica que aceptas también las
        condiciones aplicables de esos terceros para las partes del Servicio que
        dependen de ellos. No nos hacemos responsables por fallas o
        interrupciones que provengan exclusivamente de esos terceros.
      </p>

      <h2>8. Comprador final (clientes de tu negocio)</h2>
      <p>
        Cuando un cliente compra a través de tu negocio en neni, la relación
        comercial es <strong>directamente entre tú y ese cliente</strong>. neni
        solo facilita la herramienta para tomar el pedido y, en su caso,
        procesar el pago.
      </p>
      <p>Eres responsable de:</p>
      <ul>
        <li>La calidad y entrega de los productos que vendas</li>
        <li>Atender quejas, devoluciones o reembolsos a tus clientes</li>
        <li>Cumplir con la PROFECO y demás autoridades de consumo</li>
        <li>Pagar tus impuestos según corresponda</li>
      </ul>

      <h2>9. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida que la ley mexicana permita, neni{" "}
        <strong>no será responsable</strong> de:
      </p>
      <ul>
        <li>
          Daños indirectos, incidentales, especiales o consecuentes (lucro
          cesante, pérdida de clientes, etc.)
        </li>
        <li>
          Pérdidas o daños causados por uso indebido de tu cuenta por terceros
        </li>
        <li>
          Interrupciones del Servicio causadas por fallas de proveedores
          (Vercel, Twilio, Meta, etc.)
        </li>
        <li>Disputas entre tú y tus clientes</li>
      </ul>
      <p>
        Nuestra responsabilidad total ante ti, por cualquier reclamación
        relacionada con neni, no excederá{" "}
        <strong>el monto que nos hayas pagado en los últimos 6 meses</strong>.
      </p>

      <h2>10. Cancelación y terminación</h2>
      <p>
        Puedes cancelar tu cuenta en cualquier momento desde la configuración o
        escribiéndonos a{" "}
        <a href="mailto:nenisoftware@gmail.com">nenisoftware@gmail.com</a>.
        Mantendremos tus datos <strong>90 días</strong> por si decides
        reactivarte; pasado ese plazo eliminaremos tu información (salvo lo que
        debamos conservar por ley).
      </p>
      <p>
        Podemos suspender o terminar tu acceso al Servicio si violas estos
        Términos, si detectamos actividad fraudulenta, o si dejamos de operar.
        Si terminamos por causas no imputables a ti, te avisaremos con al menos
        30 días de anticipación.
      </p>

      <h2>11. Cambios a estos Términos</h2>
      <p>
        Podemos actualizar estos Términos. Cuando haya cambios sustanciales te
        avisaremos por correo o en la aplicación al menos con{" "}
        <strong>15 días de anticipación</strong>. Si no estás de acuerdo, puedes
        cancelar tu cuenta sin penalización.
      </p>

      <h2>12. Ley aplicable y jurisdicción</h2>
      <p>
        Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos.
        Cualquier controversia se resolverá ante los tribunales competentes de{" "}
        <strong>[CIUDAD, ESTADO]</strong>, México, renunciando a cualquier otro
        fuero que pudiera corresponderte por motivo de domicilio presente o
        futuro.
      </p>

      <h2>13. Contacto</h2>
      <p>
        Para cualquier duda sobre estos Términos, escríbenos a{" "}
        <a href="mailto:nenisoftware@gmail.com">nenisoftware@gmail.com</a>.
      </p>
    </LegalLayout>
  );
}
