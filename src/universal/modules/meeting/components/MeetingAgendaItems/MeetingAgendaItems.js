import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import appTheme from 'universal/styles/theme/appTheme';
import ui from 'universal/styles/ui';
import {textOverflow} from 'universal/styles/helpers';
import Button from 'universal/components/Button/Button';
import MeetingMain from 'universal/modules/meeting/components/MeetingMain/MeetingMain';
import MeetingPrompt from 'universal/modules/meeting/components/MeetingPrompt/MeetingPrompt';
import MeetingSection from 'universal/modules/meeting/components/MeetingSection/MeetingSection';
import MeetingAgendaCardsContainer from 'universal/modules/meeting/containers/MeetingAgendaCards/MeetingAgendaCardsContainer';
import LoadingView from 'universal/components/LoadingView/LoadingView';

const MeetingAgendaItems = (props) => {
  const {
    agendaItem,
    isLast,
    gotoNext,
    members,
    styles,
    hideMoveMeetingControls
  } = props;

  if (!agendaItem) {
    return <LoadingView />;
  }
  const currentTeamMember = members.find((m) => m.id === agendaItem.teamMemberId);
  const self = members.find((m) => m.isSelf);
  const heading = <span>{currentTeamMember.preferredName}: <i style={{color: ui.palette.warm}}>“{agendaItem.content}”</i></span>;

  return (
    <MeetingMain>
      <MeetingSection flexToFill paddingBottom="2rem">
        <MeetingSection flexToFill>
          <div className={css(styles.layout)}>
            <div className={css(styles.prompt)}>
              <MeetingPrompt
                avatar={currentTeamMember.picture}
                heading={heading}
                subHeading={'Whatcha need?'}
                helpText={<span><b>Actions</b>: quick tasks • <b>Projects</b>: tracked outcomes</span>}
              />
            </div>
            <div className={css(styles.nav)}>
              {!hideMoveMeetingControls &&
                <Button
                  buttonStyle="flat"
                  colorPalette="cool"
                  icon="arrow-circle-right"
                  iconPlacement="right"
                  label={isLast ? 'Wrap up the meeting' : 'Next Agenda Item'}
                  onClick={gotoNext}
                  size="smallest"
                />
              }
            </div>
            <MeetingAgendaCardsContainer
              agendaId={agendaItem.id}
              myTeamMemberId={self && self.id}
            />
          </div>
        </MeetingSection>
        {/* */}
      </MeetingSection>
      {/* */}
    </MeetingMain>
  );
};

MeetingAgendaItems.propTypes = {
  agendaItem: PropTypes.object.isRequired,
  isLast: PropTypes.bool,
  gotoNext: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
  styles: PropTypes.object.isRequired,
  hideMoveMeetingControls: PropTypes.bool
};

const styleThunk = () => ({
  layout: {
    margin: '0 auto',
    maxWidth: '80rem',
    padding: '0 .5rem 4rem',
    width: '100%',

    [ui.breakpoint.wide]: {
      paddingBottom: '0 1rem 6rem'
    },

    [ui.breakpoint.wider]: {
      paddingBottom: '8rem'
    },

    [ui.breakpoint.widest]: {
      paddingBottom: '12rem'
    }
  },

  prompt: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },

  nav: {
    paddingTop: '1rem',
    textAlign: 'center',
    width: '100%'
  },

  avatarBlock: {
    flex: 1,
    textAlign: 'center',
    whiteSpace: 'nowrap'
  },

  avatar: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '5rem',

    [ui.breakpoint.wider]: {
      width: '7.5rem'
    }
  },

  linkSpacer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 1rem 0 2rem',
    justifyContent: 'center',
    textAlign: 'right',
    width: '12rem',

    [ui.breakpoint.wider]: {
      paddingTop: '6px'
    }
  },

  agendaItemLabel: {
    ...textOverflow,
    color: appTheme.palette.dark,
    display: 'inline-block',
    fontFamily: appTheme.typography.serif,
    fontSize: appTheme.typography.s5,
    fontStyle: 'italic',
    fontWeight: 700,
    marginLeft: '1.5rem',
    maxWidth: '40rem',
    verticalAlign: 'middle',

    [ui.breakpoint.wider]: {
      fontSize: appTheme.typography.s6
    }
  }
});

export default withStyles(styleThunk)(MeetingAgendaItems);
