'use strict';

System.register('flagrow/koseki/components/ChildTagView', ['flarum/Component'], function (_export, _context) {
    "use strict";

    var Component, ChildTagView;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }],
        execute: function () {
            ChildTagView = function (_Component) {
                babelHelpers.inherits(ChildTagView, _Component);

                function ChildTagView() {
                    babelHelpers.classCallCheck(this, ChildTagView);
                    return babelHelpers.possibleConstructorReturn(this, (ChildTagView.__proto__ || Object.getPrototypeOf(ChildTagView)).apply(this, arguments));
                }

                babelHelpers.createClass(ChildTagView, [{
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;
                        var discussion = tag.lastDiscussion();

                        return m('div', { className: 'Child--Category' }, [m('a', { className: 'Title--Wrapper', href: app.route('tag', { tags: tag.slug() }), style: { color: tag.color() } }, [m('div', { className: 'Title' }, [tag.name(), m('span', { className: 'Description' }, tag.description())])]), discussion ? m('a', { className: 'LastDiscussion--Wrapper', href: app.route('discussion', { id: discussion.id() }) }, [m('div', { className: 'Avatar' }, []), m('div', { className: 'Title' }, discussion.title()), m('div', { className: 'LastReply' }, [discussion.lastUser().username()])]) : m('div', app.translator.trans('flagrow-koseki.forum.no-discussions'))]);
                    }
                }]);
                return ChildTagView;
            }(Component);

            _export('default', ChildTagView);
        }
    };
});;
'use strict';

System.register('flagrow/koseki/components/PrimaryTagView', ['flarum/Component', 'flarum/tags/utils/sortTags', './ChildTagView'], function (_export, _context) {
    "use strict";

    var Component, sortTags, ChildTagView, PrimaryTagView;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags.default;
        }, function (_ChildTagView) {
            ChildTagView = _ChildTagView.default;
        }],
        execute: function () {
            PrimaryTagView = function (_Component) {
                babelHelpers.inherits(PrimaryTagView, _Component);

                function PrimaryTagView() {
                    babelHelpers.classCallCheck(this, PrimaryTagView);
                    return babelHelpers.possibleConstructorReturn(this, (PrimaryTagView.__proto__ || Object.getPrototypeOf(PrimaryTagView)).apply(this, arguments));
                }

                babelHelpers.createClass(PrimaryTagView, [{
                    key: 'init',
                    value: function init() {
                        var _this2 = this;

                        babelHelpers.get(PrimaryTagView.prototype.__proto__ || Object.getPrototypeOf(PrimaryTagView.prototype), 'init', this).call(this);

                        this.tags = sortTags(app.store.all('tags').filter(function (tag) {
                            return tag.parent() == _this2.props.tag;
                        }));
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var tag = this.props.tag;

                        return m('li', { className: 'Category TagTile' }, m('span', { className: 'TagTile-info' }, [m('a', { className: 'Category--Title TagTile-name', style: { color: tag.color() } }, tag.name()), m('p', { className: 'Category--Description TagTile-description' }, tag.description()), m('div', { className: 'Category--Children TagTile-children' }, this.tags.map(function (tag) {
                            return ChildTagView.component({ tag: tag });
                        }))]));
                    }
                }]);
                return PrimaryTagView;
            }(Component);

            _export('default', PrimaryTagView);
        }
    };
});;
'use strict';

System.register('flagrow/koseki/main', ['flarum/extend', './pages/CategoryPage'], function (_export, _context) {
    "use strict";

    var extend, CategoryPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_pagesCategoryPage) {
            CategoryPage = _pagesCategoryPage.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-koseki', function (app) {
                app.routes['flagrow-koseki'] = {
                    path: '/koseki',
                    component: CategoryPage.component()
                };
            });
        }
    };
});;
'use strict';

System.register('flagrow/koseki/pages/CategoryPage', ['flarum/components/Page', './../components/PrimaryTagView', 'flarum/tags/utils/sortTags'], function (_export, _context) {
    "use strict";

    var Page, PrimaryTagView, sortTags, CategoryPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_componentsPrimaryTagView) {
            PrimaryTagView = _componentsPrimaryTagView.default;
        }, function (_flarumTagsUtilsSortTags) {
            sortTags = _flarumTagsUtilsSortTags.default;
        }],
        execute: function () {
            CategoryPage = function (_Page) {
                babelHelpers.inherits(CategoryPage, _Page);

                function CategoryPage() {
                    babelHelpers.classCallCheck(this, CategoryPage);
                    return babelHelpers.possibleConstructorReturn(this, (CategoryPage.__proto__ || Object.getPrototypeOf(CategoryPage)).apply(this, arguments));
                }

                babelHelpers.createClass(CategoryPage, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(CategoryPage.prototype.__proto__ || Object.getPrototypeOf(CategoryPage.prototype), 'init', this).call(this);

                        this.tags = sortTags(app.store.all('tags').filter(function (tag) {
                            return tag.isPrimary();
                        }));
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m('div', { className: 'TagsPage' }, m('div', { className: 'container' }, m('div', { className: 'TagsPage-content' }, m('ul', { className: 'Koseki--Categories TagTiles' }, this.tags.map(function (tag) {
                            return PrimaryTagView.component({ tag: tag });
                        })))));
                    }
                }]);
                return CategoryPage;
            }(Page);

            _export('default', CategoryPage);
        }
    };
});