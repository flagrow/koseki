import Component from 'flarum/Component';

export default class ChildTagView extends Component {
    view() {
        const tag = this.props.tag;
        const discussion = tag.lastDiscussion();

        return m('div', {className: 'Child--Category'}, [
            m('div', {className: 'Title--Wrapper', style: {color: tag.color()}}, [
                m('div', {className: 'Title'}, tag.name()),
                m('div', {className: 'Description'}, tag.description())
            ]),
            discussion ? m('div', {className: 'LastDiscussion--Wrapper'}, [
                m('div', {className: 'Avatar'}, []),
                m('div', {className: 'Title'}, discussion.title()),
                m('div', {className: 'LastReply'}, [
                    discussion.lastUser().username()
                ])
            ]) : m('div', 'no discussion yet')
        ]);
    }
}
