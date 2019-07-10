/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = "Hola, bienvenido, Qué deseas hacer hoy?";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt("Qué quieres hacer?")
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

const DoctorAppointmentIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DoctorAppointment';
  },
  handle(handlerInput) {
    const nombre_doctor = handlerInput.requestEnvelope.request.intent.slots.nombre_doctor.value;
    const dia = handlerInput.requestEnvelope.request.intent.slots.dia.value;
    const hora = handlerInput.requestEnvelope.request.intent.slots.hora.value;
    const diassml = `<say-as interpret-as="date">${dia}</say-as>`
    const speechText = 'Muy bien. tu hora con ' + `${nombre_doctor}` + ' del ' +`${diassml}` +' a las ' + `${hora}` +' ha sido agendada.';
    

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Info', speechText)
      .getResponse();
  },
};

const DoctorWhenIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DoctorWhen';
  },
  handle(handlerInput) {
    const speechText = 'Tienes médico el miercoles a las 12:30 con Francisco Diaz';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const ListIntentsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ListIntents';
  },
  handle(handlerInput) {
    const speechText = "Con tu asistente, Puedes agendar una hora médica, Consultar por una hora médica, agregar algún medicamento, consultar por un medicamento, guardar y consultar tu información básica de contacto, así también, puedes enviar una notificación a tus familiares en caso de emergencia o que te sientas mal ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const MedsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'Meds';
  },
  handle(handlerInput) {
    const speechText = "Claro, Debes tomar un Ibuprofeno de 600 mg a las 20:30 horas";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(speechText)
      .getResponse();
  },
};

const SOSIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'sos';
  },
  handle(handlerInput) {
  
    const speechText = "Hecho. He notificado a tus contactos de emergencia, pronto recibirás asistencia";
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Info', speechText)
      .getResponse();
  },
};

const elevatorpitchIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'elevatorpitch';
  },
  handle(handlerInput) {
  
    const speechText = "Claro, soy mi asistente, una aplicación integrada en amazon alexa y bueno vivo aquí, en este altavoz llamado echo dot, brindo ayuda a personas de tercera edad en sus quehaceres diarios, imaginas poder agendar tus horas médicas simplemente hablando?, conmigo puedes. Puedo guardar tu lista de medicamentos, horas médicas e información relevante para cuando la necesites, también, puedo notificar a tu familia en caso de emergencia o que tengas un accidente. Estoy aqui para ayudar y facilitar un poco las cosas. Quieres saber mas de mi? pronto podras descargar mi aplicación en la store de amazon. Gracias, chau chau";
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Info', speechText)
      .getResponse();
  },
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

let skill;

exports.handler = async function (event, context) {
  console.log(`REQUEST++++${JSON.stringify(event)}`);
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(

        DoctorAppointmentIntentHandler,
        LaunchRequestHandler,
        DoctorWhenIntentHandler,
        ListIntentsIntentHandler,
        MedsIntentHandler,
        SOSIntentHandler,
        elevatorpitchIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  const response = await skill.invoke(event, context);
  console.log(`RESPONSE++++${JSON.stringify(response)}`);

  return response;
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    DoctorAppointmentIntentHandler,
    LaunchRequestHandler,
    DoctorWhenIntentHandler,
    ListIntentsIntentHandler,
    MedsIntentHandler,
    SOSIntentHandler,
    elevatorpitchIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
