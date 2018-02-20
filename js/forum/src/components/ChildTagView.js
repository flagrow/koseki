import Component from 'flarum/Component';

export default class ChildTagView extends Component {
    view() {
        const tag = this.props.tag;
        const discussion = tag.lastDiscussion();

        return m('div', {className: 'Child--Category'}, [
            m('a', {className: 'Title--Wrapper', href: app.route('tag', {tags: tag.slug()}), style: {color: tag.color()}}, [
                m('div', {className: 'Title'}, [tag.name(), m('span', {className: 'Description'}, tag.description())]),

            ]),
            discussion ? m('a', {className: 'LastDiscussion--Wrapper', href: app.route('discussion', {id: discussion.id()})}, [
                m('div', {className: 'Avatar'}, []),
                m('div', {className: 'Title'}, discussion.title()),
                m('div', {className: 'LastReply'}, [
                    discussion.lastUser().username()
                ])
            ]) : m('div', app.translator.trans('flagrow-koseki.forum.no-discussions'))
        ]);
    }
}
