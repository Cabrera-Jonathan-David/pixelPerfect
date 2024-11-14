import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FaqSection } from '../../Interface/faq-section';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent implements OnInit{

faqSections: FaqSection [] = [
    {
      title: 'Pedidos',
      questions: [
        {
          question: '¿Cuál es el tiempo estimado de envío?',
          answer: 'El tiempo estimado de envío depende de la disponibilidad del producto y la ubicación de entrega. Generalmente, los pedidos se procesan en 1-2 días hábiles y se entregan en un plazo de 3 a 7 días hábiles. En áreas más alejadas, el envío puede demorar hasta 10 días hábiles.',
          isOpen: false
        },
        {
          question: '¿Cómo puedo hacer seguimiento de mi pedido?',
          answer: 'Una vez que tu pedido haya sido procesado, recibirás un número de seguimiento por correo electrónico. Podrás utilizar este número para rastrear el estado de tu envío en la página de la empresa de mensajería.',
          isOpen: false
        },
        {
          question: '¿Realizan envíos internacionales?',
          answer: 'En este momento, ofrecemos envíos únicamente dentro del país. En futuras actualizaciones, consideraremos opciones de envío internacional para que nuestros productos puedan llegar a más lugares.',
          isOpen: false
        },
        {
          question: '¿Puedo cambiar la dirección de envío después de hacer un pedido?',
          answer: 'Una vez confirmado el pedido, no es posible cambiar la dirección de envío. Te recomendamos verificar todos los detalles antes de completar la compra para asegurar que la entrega se realice correctamente.',
          isOpen: false
        }
      ]
    },
    {
      title: 'Politica de Devoluciones y Garantía.',
      questions: [

        {
          question: '¿Cuál es la política de devoluciones?',
          answer: 'Aceptamos devoluciones en un plazo de 30 días desde la fecha de compra, siempre y cuando el producto esté en su empaque original y sin signos de uso. Para iniciar el proceso, puedes contactarnos por nuestro canal oficial de comunicación. No se aplican reembolsos para productos abiertos o usados.',
          isOpen: false
        },
        {
          question: '¿Cómo puedo hacer una devolución o cambio?',
          answer: 'Para realizar una devolución o cambio, contacta nuestro canal oficial de comunicación indicando el número de pedido y el motivo de la devolución. Te guiaremos en el proceso y te proporcionaremos los pasos necesarios para completar la devolución o cambio.',
          isOpen: false
        },
        {
          question: '¿Los productos tienen garantía? ¿Qué cubre?',
          answer: 'Todos nuestros productos incluyen una garantía limitada de 1 año que cubre defectos de fabricación. La garantía no aplica a daños causados por uso indebido, accidentes o reparaciones no autorizadas. Para más detalles o para hacer válida la garantía, contáctanos a través de nuestro canal oficial de comunicación.',
          isOpen: false
        }
      ]
    },
    {
      title: 'Pagos y Seguridad.',
      questions: [
        {
          question: '¿Cuáles son los métodos de pago disponibles?',
          answer: 'Actualmente, aceptamos pagos con tarjeta de débito o crédito en un solo pago a través de nuestra tienda en línea. Si prefieres abonar en efectivo, puedes hacerlo en cualquiera de nuestras sucursales.',
          isOpen: false
        },     
        {
          question: '¿Es seguro comprar en su tienda en línea?',
          answer: 'Sí, tu compra es completamente segura. Contamos con un sistema de pago en línea certificado y encriptado para proteger tus datos personales y bancarios.',
          isOpen: false
        },
        {
          question: '¿Puedo pagar en cuotas o a meses sin intereses?',
          answer: 'Actualmente, solo ofrecemos pago en un solo pago con tarjeta de débito o crédito. No disponemos de opción para pagar en cuotas o a meses sin intereses en nuestra tienda en línea.',
          isOpen: false
        }
      ]
    },
    {

      title: 'Información de productos.',
      questions: [
        {
          question: '¿Cómo puedo saber si un artículo es compatible con mi equipo actual?',
          answer: 'Si tienes dudas sobre la compatibilidad de un artículo con tu equipo, puedes comunicarte a través de nuestro canal oficial de comunicación. Nuestro equipo estará encantado de evacuar todas tus consultas y ayudarte a elegir el producto adecuado.',
          isOpen: false
        },
        {
          question: '¿Los productos son nuevos o reacondicionados?',
          answer: 'Todos los productos disponibles en nuestra tienda son nuevos y vienen directamente de los fabricantes.',
          isOpen: false
        },
        {
          question: '¿Ofrecen soporte para instalación o configuración de los productos?',
          answer: 'Actualmente, no ofrecemos soporte para la instalación o configuración de los productos. Sin embargo, proporcionamos toda la información necesaria en los manuales de usuario que incluyen nuestros productos.',
          isOpen: false
        },
        {
          question: '¿Cómo elijo la computadora adecuada para mis necesidades?',
          answer: 'Para elegir la computadora adecuada, es importante considerar tus necesidades de uso, como el tipo de trabajo o actividades que realizarás. Si tienes dudas, puedes comunicarte con nosotros a través de nuestro canal oficial de comunicación y te ayudaremos a elegir el modelo más adecuado para ti.',
          isOpen: false
        }
      ]
    },
    {

      title: 'Soporte Técnico y Servicio al Cliente.',
      questions: [
        {
          question: '¿Ofrecen soporte técnico para los productos comprados?',
          answer: 'El soporte técnico para los productos adquiridos es proporcionado directamente por el fabricante. Te recomendamos contactar con ellos para asistencia técnica especializada.',
          isOpen: false
        },
        {
          question: '¿Cómo puedo contactar al servicio al cliente?',
          answer: 'Puedes contactar a nuestro servicio al cliente a través de nuestras redes sociales o visitando cualquiera de nuestros locales. Estaremos disponibles para resolver cualquier duda o inquietud que tengas.',
          isOpen: false
        },
        {
          question: '¿Cuál es el horario de atención al cliente?',
          answer: 'Nuestro horario de atención al cliente es de lunes a viernes, de 09:00 AM a 06:00 PM. No dudes en comunicarte durante ese horario para recibir asistencia.',
          isOpen: false
        },
        {
          question: '¿Tienen servicio de reparación o mantenimiento?',
          answer: 'Actualmente, no ofrecemos servicio de reparación o mantenimiento. Te sugerimos contactar con el fabricante o el proveedor del producto para estos servicios.',
          isOpen: false
        }
      ]
    },
    {

      title: 'Cuenta de Usuario',
      questions: [

        {
          question: '¿Cómo puedo crear una cuenta o registrarme?',
          answer: 'Para registrarte, haz clic en el botón "Iniciar sesión" en la esquina superior derecha de nuestra página. Luego, selecciona "Crea una cuenta aquí" y completa los datos solicitados.',
          isOpen: false
        },
        {
          question: '¿Cómo actualizo la información de mi perfil?',
          answer: 'Para actualizar tu información personal, inicia sesión en tu cuenta y haz clic en el icono de cuenta en la esquina superior derecha. Luego, selecciona el botón "Modificar información personal" para hacer los cambios necesarios.',
          isOpen: false
        },
        {
          question: '¿Es necesario registrarse para hacer una compra?',
          answer: 'No es necesario registrarse para realizar una compra. Sin embargo, te recomendamos crear una cuenta, ya que esto te permitirá realizar compras más rápidas en el futuro, sin tener que ingresar tus datos cada vez.',
          isOpen: false
        }
      ]
    }
  ]

  toggleAnswer(sectionIndex: number, questionIndex: number): void{
    const question = this.faqSections[sectionIndex].questions[questionIndex];
    question.isOpen =!question.isOpen;
  }

  ngOnInit(): void {
    
  }

}
