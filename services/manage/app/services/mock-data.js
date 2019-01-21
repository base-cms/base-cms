import Service from '@ember/service';

const content = [
  {
    id: 21044236,
    title: 'Why Marketers Must Embrace Ethical Data Use',
    teaser: 'Data Privacy Week gives all of us an opportunity to reflect on how the conversation surrounding data has shifted in the last year or so. We’ve seen a much more intense focus on using data in a responsible manner',
    image: {
      src: 'https://fortnight.imgix.net/acbm/5beae595f3eec100014dccf5/Jordan%20Abbott%202018.jpg?crop=focalpoint&dpr=2&fit=crop&fp-x=0.55&fp-y=0.24&h=270&w=480',
      alt: 'image alt',
    },
    type: 'Article',
    status: 'Published',
    updated: new Date(),
    updatedBy: {
      username: 'jbare@southcomm.com',
    },
  },

  {
    id: 21044229,
    title: 'Data-Driven Marketers: It takes big and small to know it all',
    teaser: 'We have so much data at our fingertips, it can be easy to fall into the trap of assuming that we know our customers.',
    image: {
      src: 'https://fortnight.imgix.net/acbm/5be5b9e28e1d720001f99577/Small_Data_Blog_Post_Zlatko-1.jpg?crop=focalpoint&dpr=2&fit=crop&fp-x=0.51&fp-y=0.52&h=270&w=480',
      alt: 'image alt',
    },
    type: 'Press Release',
    status: 'Draft',
    updated: new Date(),
    updatedBy: {
      username: 'bkrigbaum@southcomm.com',
    },
  },

  {
    id: 21044231,
    title: 'Toughened Epoxy Resists High Temperatures & Chemicals',
    teaser: 'Master Bond Supreme 62-1 delivers enhanced chemical and temperature resistance while maintaining high performance properties. This adhesive offers excellent flow properties and a long working life over a wide service temperature range.',
    image: {
      src: 'https://fortnight.imgix.net/acbm/5c1d09e2120492000161be08/SUP62-1.jpg?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: '',
    },
    type: 'Blog',
    status: 'Published',
    updated: new Date(),
    updatedBy: {
      username: 'ppeluso@southcomm.com',
    },
  },

  {
    id: 21044227,
    title: 'Monster 4 Drawer Cart with larger top storage',
    teaser: 'This professional cart provides lots of storage and has a large 15.6″ tall top storage compartment, latching drawers and PVC drawer liners. 5″ HD casters for smooth mobility. Bumpers provide extra protection in case of contact with painted surfaces.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5bcf4cc20787b80001c2ded0/MST3304XORNG.5b6871b32aee9.jpg?crop=focalpoint&dpr=2&fit=crop&fp-x=0.46&fp-y=0.48&h=270&w=480',
      alt: '',
    },
    type: 'News',
    status: 'Scheduled',
    updated: new Date(),
    updatedBy: {
      username: 'sscullin@southcomm.com',
    },
  },

  {
    id: 21044111,
    title: 'Designed for EXTREME environments',
    teaser: 'The G-SHOCK MUDMASTER GG1000 is an ideal "Every Day Carry" item as it\'s mud resistant construction helps to ensure that nothing gets into the watch under tough conditions.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c2cf775cc527100017d01c8/FTSbFj1w.png?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: '',
    },
    type: 'Article',
    status: 'Published',
    updated: new Date(),
    updatedBy: {
      username: 'bmiller@southcomm.com',
    },
  },

  {
    id: 21044110,
    title: 'Globe ATHLETIX™ - Like nothing you’ve ever experienced.',
    teaser: 'All-new athletic design with stretch fabrics for body-contoured, less bulky fit, lighter weight, and unprecedented range of motion.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c3e0857353611000143406f/Native%20Ad%20for%20ATHLETIX%20new%20image%20with%20MSA%20tank%20logo%201800x1012.jpg?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: '',
    },
    type: 'Video',
    status: 'Deleted',
    updated: new Date(),
    updatedBy: {
      username: 'jworden@southcomm.com',
    },
  },

  {
    id: 21044109,
    title: 'Center Brunswick Vol. Fire Department receives Marion Pumper',
    teaser: 'Marion\'s priority is to listen to the customer\'s needs. Check out more departments that have experienced the Marion Difference!',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c0e7078cf399b00017997e3/Center%20Brunswick.jpg?crop=focalpoint&dpr=2&fit=crop&fp-x=0.27&fp-y=0.45&h=270&w=480',
      alt: '',
    },
    type: 'Press Release',
    status: 'Draft',
    updated: new Date(),
    updatedBy: {
      username: 'jfitzgerald@southcomm.com',
    },
  },

  {
    id: 21044106,
    title: 'Connect with the future of mobility at ABB Customer World',
    teaser: 'Formula E is at the forefront not only of electric vehicle technology but of IoT, data analytics and real-time communications. See how ABB FIA Formula E is shaping the future of mobility at ABB Customer World, March 4-7. Registration is FREE.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c353642e36e7700018eb020/ABB-1753-CID_1200x628.jpeg?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: '',
    },
    type: 'Product',
    status: 'Published',
    updated: new Date(),
    updatedBy: {
      username: 'bkrigbaum@southcomm.com',
    },
  },

  {
    id: 21044088,
    title: 'Good Quality - Sufficently Rugged',
    teaser: 'Through superior mud resistant construction, the G-SHOCK Mudmaster GG1000 is designed to withstand all environments, offering all of the characteristics you\'ve come to expect from G-SHOCK.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c2cf819cc527100017d0f1d/gg1000mud-1-hd.jpg?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: '',
    },
    type: 'News',
    status: 'Scheduled',
    updated: new Date(),
    updatedBy: {
      username: 'jbare@southcomm.com',
    },
  },
];

export default Service.extend({
  allContent() {
    return content;
  },
  content(id) {
    return content.find(c => c.id === id);
  },
});
