import Component from 'flarum/Component';
import sortTags from 'flarum/tags/utils/sortTags';
import ChildTagView from "./ChildTagView";

export default class PrimaryTagView extends Component {
    init() {
        super.init();

        this.tags = sortTags(app.store.all('tags').filter(tag => tag.parent() == this.props.tag));
    }

    view() {
        const tag = this.props.tag;

        return m('li', {className: 'Category TagTile'}, m('span', {className: 'TagTile-info'}, [
            m('a', {className: 'Category--Title TagTile-name', style: {color: tag.color()}}, tag.name()),
            m('p', {className: 'Category--Description TagTile-description'}, tag.description()),
            m('div', {className: 'Category--Children TagTile-children'}, this.tags.map(tag => ChildTagView.component({tag})))
        ]));
    }
}
