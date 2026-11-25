// TATA 1mg "hoomans": character illustrations from the Figma file
// (WIP – Dopamine Spike, "Section 2"). Pose names describe what each image
// shows; several Figma variant names don't (e.g. phlebotomist "with coupon"
// shows no coupon), so the original is kept in `figmaVariant`. Usage text is
// copied from each component's Figma description.

const files = import.meta.glob('../../../hoomans/*.webp', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const src = (file: string) => files[`../../../hoomans/${file}.webp`];

export interface HoomanPose {
  /** Code name: describes what the illustration actually shows. */
  pose: string;
  /** Original Figma variant name, e.g. `pose=with doc` → `with doc`. */
  figmaVariant: string;
  file: string;
  width: number;
  height: number;
  figmaNodeId: string;
  /** Short description of what the illustration shows (good default alt text). */
  shows: string;
  /** When to use it, from the Figma component description. */
  usage: string;
}

export interface HoomanCharacter {
  label: string;
  figmaFrame: string;
  poses: HoomanPose[];
}

const p = <P extends string>(
  pose: P,
  figmaVariant: string,
  file: string,
  width: number,
  height: number,
  figmaNodeId: string,
  shows: string,
  usage: string,
): HoomanPose & { pose: P } => ({ pose, figmaVariant, file, width, height, figmaNodeId, shows, usage });

export const hoomans = {
  delivery: {
    label: 'Delivery partner',
    figmaFrame: 'delivery-hooman',
    poses: [
      p('with-box', 'with box', 'delivery-with-box', 727, 1500, '40002869:9457',
        'Smiling delivery partner standing and holding a sealed parcel with both hands.',
        'Use as supporting imagery for parcel handover, delivery arrival, receiving an order, pickup instructions, and delivery-service introductions. Pair with explicit copy to distinguish ready for pickup, arriving, and delivered states.'),
      p('running', 'running', 'delivery-running', 797, 1035, '40002869:9459',
        'Delivery partner running while carrying a sealed parcel.',
        'Use as supporting imagery for express-delivery promotions, priority fulfillment, urgent order preparation, and energetic delivery-service onboarding. Treat the pose as a speed metaphor, not a promise of a specific delivery time; pair with accurate service or status text.'),
      p('bike', 'bike', 'delivery-bike', 888, 1228, '40002869:9460',
        'Friendly delivery partner riding a scooter, shown from a three-quarter front view with a delivery carrier.',
        'Use as supporting imagery for order dispatched, out-for-delivery, delivery tracking, and delivery-service introductions. Pair with an explicit status or ETA; this pose does not indicate that an order has arrived.'),
      p('store', 'store', 'delivery-store', 1050, 991, '40002869:9461',
        'Smiling delivery partner behind a counter with sealed parcels, giving a thumbs-up.',
        'Use as supporting imagery for order packing completed, parcels ready for pickup, store fulfillment, and successful handover to the delivery team. Use the thumbs-up-only variant for general success messages without a packing or store context.'),
      p('concerned', 'front', 'delivery-concerned', 687, 1464, '40002869:9462',
        'Concerned delivery partner standing with hands on hips and a downturned expression.',
        'Use as supporting imagery for delivery delays, unsuccessful delivery attempts, service unavailability, and order issues that need attention. Pair with a clear explanation and a recovery action such as retrying, rescheduling, or contacting support; avoid using for success states.'),
      p('bike-side', 'bike-side', 'delivery-bike-side', 938, 918, '40002869:9463',
        'Side-profile delivery partner riding a scooter with a delivery carrier.',
        'Use as supporting imagery for in-transit orders, out-for-delivery updates, delivery journey banners, and tracking timelines. The horizontal silhouette suits wide layouts. Pair with explicit status text; do not use it alone to imply live location or a guaranteed arrival time.'),
      p('thumbs-up', 'thumbs-up', 'delivery-thumbs-up', 555, 1384, '40002869:9464',
        'Smiling delivery partner standing and giving a thumbs-up.',
        'Use as supporting imagery for order confirmation, successful delivery, completed actions, and reassuring service messages. Pair with text identifying what succeeded; choose a parcel or counter variant when the message specifically concerns packing or handover.'),
      p('confused', 'confused', 'delivery-confused', 1291, 1005, '40002869:9465',
        'Delivery partner shrugging behind a counter beside an open, empty box.',
        'Use as supporting imagery for an empty cart, no orders yet, no matching products, or missing-item help. Pair with text that makes the exact state clear and offers a next step such as browsing products, clearing filters, or reporting an issue. Avoid using for an active delivery or success state.'),
    ],
  },
  doctor: {
    label: 'Doctor',
    figmaFrame: 'doctor',
    poses: [
      p('arms-folded', 'front', 'doctor-arms-folded', 494, 1385, '40002872:9520',
        'Smiling doctor in a white coat and stethoscope, standing with arms folded.',
        'Use as supporting imagery for doctor-service introductions, healthcare onboarding, appointment entry points, and general care or reassurance messages. This is a generic illustrated character; do not present it as a real clinician profile, credential, or guarantee of outcomes.'),
      p('with-meds', 'with meds', 'doctor-with-meds', 603, 1420, '40002872:9518',
        'Doctor wearing a stethoscope and holding a medicine bottle.',
        'Use as supporting imagery for prescribed-treatment explanations, medication guidance, treatment-plan follow-ups, and consultation-led medicine information. Avoid using it as a product endorsement or to imply that a particular medicine is safe, effective, or appropriate for everyone.'),
      p('with-stethoscope', 'with steth', 'doctor-with-stethoscope', 348, 767, '40002872:9506',
        'Doctor in a white coat holding a stethoscope and clipboard.',
        'Use as supporting imagery for doctor consultations, routine checkups, appointment booking, preventive-care introductions, and general medical assessment. This is a general-care illustration, not evidence of a particular specialty, diagnosis, or treatment outcome.'),
      p('in-lab', 'with testubes', 'doctor-in-lab', 1754, 1418, '40002872:9508',
        'White-coated healthcare character working with test tubes, a dropper, and a flask at a laboratory bench.',
        'Use as supporting imagery for diagnostic testing, laboratory services, sample analysis, and test-processing explanations. Although grouped with doctor poses, the scene depicts laboratory work rather than a consultation; do not use it to imply that results are ready or normal.'),
      p('with-patient', 'with patient', 'doctor-with-patient', 1122, 1018, '40002872:9510',
        'Doctor seated at a desk speaking with an adult woman during an in-person consultation.',
        'Use as supporting imagery for clinic appointments, discussing symptoms, care-plan explanations, report reviews, and patient guidance. Do not imply a specific diagnosis or specialty from the patient’s appearance; choose explicit copy to establish the consultation context.'),
    ],
  },
  pharmacist: {
    label: 'Pharmacist',
    figmaFrame: 'pharmacist',
    poses: [
      p('with-coupon', 'with coupon', 'pharmacist-with-coupon', 1553, 1134, '40002872:9549',
        'Pharmacist behind a checkout counter presenting a percentage-off coupon, beside a payment terminal and branded shopping bag.',
        'Use as supporting imagery for pharmacy offers, coupon discovery, medicine-order savings, and checkout promotions. Pair with the actual offer amount, eligibility, and terms; the image does not specify a discount value.'),
      p('verifying-prescription', 'with prescription', 'pharmacist-verifying-prescription', 1577, 1074, '40002872:9547',
        'Pharmacist behind a counter reviewing a paper while holding a medicine bottle, with medicine packs, a branded bag, and a desk calendar.',
        'Use as supporting imagery for prescription verification, preparing a medicine order, refill assistance, and pharmacy dispensing information. The calendar is decorative; do not interpret its visible number as a delivery date or turnaround promise.'),
      p('standing-with-medicine', 'with doc', 'pharmacist-standing-with-medicine', 659, 1387, '40002872:9541',
        'Pharmacy character in a green checked shirt, reading a paper while holding a medicine bottle.',
        'Use as supporting imagery for prescription review, medicine information, refill reminders, and pharmacist-guided medicine selection. Pair with clear copy about the task; do not use the image alone to imply a medicine is approved or suitable for a particular patient.'),
      p('on-call', 'with call', 'pharmacist-on-call', 1536, 1012, '40002872:9543',
        'Pharmacist in a white coat speaking on a telephone behind a counter with a branded shopping bag.',
        'Use as supporting imagery for call-a-pharmacist services, medicine-order assistance, prescription clarification, callback requests, and pharmacy customer support. The scene represents a phone conversation, not a video consultation or delivery status.'),
    ],
  },
  phlebotomist: {
    label: 'Phlebotomist',
    figmaFrame: 'phlebotomist',
    poses: [
      p('thumbs-up', 'with coupon', 'phlebotomist-thumbs-up', 618, 1376, '40002872:9571',
        'Smiling phlebotomist holding a clipboard and giving a thumbs-up.',
        'Use as supporting imagery for confirmed test bookings, completed sample collection, completed checklists, and reassuring next-step messages. Pair with explicit status text; do not imply normal test results or a clean bill of health from the gesture alone.'),
      p('with-syringe', 'with prescription', 'phlebotomist-with-syringe', 649, 1313, '40002872:9569',
        'Smiling phlebotomist standing and holding an upright syringe.',
        'Use as supporting imagery for phlebotomist introductions, sample-collection service overviews, and pre-visit information about trained collection staff. Prefer the patient-collection scenes for actual blood-test visits; do not treat the pose as a clinical instruction.'),
      p('home-visit-senior', 'with doc', 'phlebotomist-home-visit-senior', 1351, 984, '40002872:9565',
        'Phlebotomist collecting a blood sample from an older woman seated at home, with a medical collection bag nearby.',
        'Use as supporting imagery for at-home blood tests, senior-friendly sample collection, home-visit booking, and appointment preparation. Pair with clear service details; the illustration is not a procedural guide.'),
      p('home-visit', 'with call', 'phlebotomist-home-visit', 1459, 951, '40002872:9567',
        'Phlebotomist collecting a blood sample from a seated adult man at home, with a medical collection bag nearby.',
        'Use as supporting imagery for home sample collection, blood-test booking, collector-visit information, and what to expect at an appointment. Do not use as a step-by-step clinical instruction.'),
      p('vaccination', 'pose5', 'phlebotomist-vaccination', 1469, 1013, '40002872:9830',
        'Gloved healthcare professional administering an injection into an adult patient’s upper arm.',
        'Use as supporting imagery for vaccination services, immunization booking, and injection-appointment information where the service is offered. This is an injection scene, not a blood-sample collection scene; avoid using it for blood tests or as a procedural guide.'),
    ],
  },
} satisfies Record<string, HoomanCharacter>;

export type HoomanCharacterName = keyof typeof hoomans;
export type HoomanPoseName<C extends HoomanCharacterName> =
  (typeof hoomans)[C]['poses'][number]['pose'];

export const characterNames = Object.keys(hoomans) as HoomanCharacterName[];

export function findPose(character: HoomanCharacterName, pose: string) {
  const found = (hoomans[character].poses as HoomanPose[]).find((x) => x.pose === pose);
  return found ? { ...found, src: src(found.file) } : undefined;
}
