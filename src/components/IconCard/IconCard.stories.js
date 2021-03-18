import React from 'react'
import IconCard from './IconCard'

export default {
  title: 'Components/Icon Card',
  component: IconCard,
  argTypes: {
    icon: {},
    altText: {},
    title: {},
    desc: {},
    link: {},
    linkText: {},
    count: {
      table: {
        defaultValue: {
          summary: 0
        }
      }
    },
    badgeText: {
      table: {
        defaultValue: {
          summary: "new"
        }
      }
    },
    download: {
      table: {
        defaultValue: {
          summary: false
        }
      }
    },
  }
}

const Template = (args) => <IconCard {...args} />

export const DemoIconCard = Template.bind({})
DemoIconCard.storyName = "Icon Card"
DemoIconCard.args = {
  icon: "doctor.svg",
  title: "Icon Card",
  altText: "doctor icon",
  desc: "La croix succulents vape unicorn, chicharrones cray sustainable hashtag deep v plaid pug. Ennui next level prism ethical woke four loko chambray. Franzen pitchfork meh, ramps try-hard keffiyeh man bun cliche kickstarter chartreuse blog selfies paleo single-origin coffee. Tumeric leggings hexagon 90's chia, snackwave adaptogen.",
  count: 0
}

export const NewIconCard = Template.bind({})
NewIconCard.storyName = "With Badge"
NewIconCard.args = {
  icon: "biomarker-tests.svg",
  title: "Biomarker Report",
  altText: "biomarker test reports icon",
  desc: "This is your biomarker report from samples taken on August 15th.",
  count: 1
}
NewIconCard.story = {
  parameters: {
    docs: {
      storyDescription: 'Setting the `count` to a number greater than 0 on this component will reveal the badge. The `count` typically refers to the number of "new notifications" or "new reports" which is included in the user data.'
    }
  }
}

export const DownloadIconCard = Template.bind({})
DownloadIconCard.storyName = "With Links"
DownloadIconCard.args = {
  icon: "reports.svg",
  title: "Consent Form",
  altText: "reports icon",
  desc: "Here is the consent form you sign when agreeing to participate in the NCI Biobank project.",
  count: 0,
  download: true,
  link: '//youtu.be/dQw4w9WgXcQ',
  linkText: "Preview Report",
}
DownloadIconCard.story = {
  parameters: {
    docs: {
      storyDescription: 'Some cards include links to other pages. If `link` and `linkText` are included, then a link will be added to the bottom of the card. If `download` is also set to true, then the link will open in a new window as if it were an external link.'
    }
  }
}