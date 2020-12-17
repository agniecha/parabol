import {NewMeetingPhaseTypeEnum} from 'parabol-client/types/graphql'
import Meeting from '../../../database/types/Meeting'
import MeetingTemplate from '../../../database/types/MeetingTemplate'
import segmentIo from '../../../utils/segmentIo'

const sendMeetingStartToSegment = async (newMeeting: Meeting, template?: MeetingTemplate) => {
  const {facilitatorUserId, meetingNumber, meetingType, phases, teamId} = newMeeting
  segmentIo.track({
    userId: facilitatorUserId,
    event: 'Meeting Started',
    properties: {
      hasIcebreaker: phases[0].phaseType === NewMeetingPhaseTypeEnum.checkin,
      meetingType,
      meetingTemplateId: template?.id,
      meetingTemplateName: template?.name,
      meetingTemplateScope: template?.scope,
      meetingNumber,
      teamId
    }
  })
}

export default sendMeetingStartToSegment
