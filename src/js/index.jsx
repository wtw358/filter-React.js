/*
 This is my first time to use React.js. So I take a reference of the code in this website:
 https://facebook.github.io/react/docs/thinking-in-react.html
 */

var React = require('react');
var ReactDOM = require('react-dom');
var ColorComponent = require("./components/ColorComponent.jsx");


//print detail item
class ProductRow extends React.Component {
    render() {
        var name =
            this.props.product.name;

        return (
            <tr>
                <td><a href={this.props.product.ref}>{name}</a></td>
                <td className='author'>{this.props.product.author}</td>
                <td className='price'>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        //implement filtering and searching
        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1) {
                return;
            }
            var price = product.price;
            var number = Number(price.replace('$',''));

            if (this.props.inAll) {
                rows.push(<ProductRow product={product} key={product.name}/>);
                return;
            }

            if (!this.props.inPhysics && !this.props.inMath && !this.props.inComputer
                && !this.props.inAll &&  !this.props.inLarge && !this.props.inSmall) {
                rows.push(<ProductRow product={product} key={product.name}/>);
                return;
            }

            if (number >= 100 && this.props.inLarge) {
                rows.push(<ProductRow product={product} key={product.name}/>);
                return;
            }
            if (number < 100 && this.props.inSmall) {
                rows.push(<ProductRow product={product} key={product.name}/>);
                return;
            }

            if (product.category == 'Physics' && this.props.inPhysics) {
                rows.push(<ProductRow product={product} key={product.name}/>);
                return;
            }
            if (product.category == 'Mathematics' && this.props.inMath) {
                rows.push(<ProductRow product={product} key={product.name}/>);
                return;

            }
            if (product.category == 'Computer Science' && this.props.inComputer) {
                rows.push(<ProductRow product={product} key={product.name}/>);
                return;
            }

        });
        return (

            <table className="table">
                <thead>
                <tr>
                    <th>Textbook Name</th>
                    <th className="authorName">Author</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.filterTextInput.value,
            this.inMathInput.checked,
            this.inPhysicsInput.checked,
            this.inComputerInput.checked,
            this.inAllInput.checked,
            this.inLargeInput.checked,
            this.inSmallInput.checked
        );
    }

    render() {
        return (
            <form className="search_filter" action="">
                {/*search bar*/}
                <input
                    type="text"
                    placeholder="Search the book name..."
                    value={this.props.filterText}
                    ref={(input) => this.filterTextInput = input}
                    onChange={this.handleChange}
                    className="search_bar"
                />
                {/*check box*/}
                <p>
                    <input
                        type="radio"
                        checked={this.props.inAll}
                        ref={(input) => this.inAllInput = input}
                        onChange={this.handleChange}
                        name="category"
                    />
                    All

                    {' '}
                    <input
                        type="radio"
                        checked={this.props.inMath}
                        ref={(input) => this.inMathInput = input}
                        onChange={this.handleChange}
                        name="category"
                    />
                    Mathematics

                    {' '}
                    <input
                        type="radio"
                        checked={this.props.inPhysics}
                        ref={(input) => this.inPhysicsInput = input}
                        onChange={this.handleChange}
                        name="category"
                    />
                    Physics

                    {' '}
                    <input
                        type="radio"
                        checked={this.props.inComputer}
                        ref={(input) => this.inComputerInput = input}
                        onChange={this.handleChange}
                        name="category"
                    />
                    Computer Science
                    <br/>
                    <input
                        type="radio"
                        checked={this.props.inLarge}
                        ref={(input) => this.inLargeInput = input}
                        onChange={this.handleChange}
                        name="category"
                    />
                    Price >= $100

                    {' '}
                    <input
                        type="radio"
                        checked={this.props.inSmall}
                        ref={(input) => this.inSmallInput = input}
                        onChange={this.handleChange}
                        name="category"
                    />
                    Price &lt; $100
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inMath: false,
            inPhysics: false,
            inComputer: false,
            inAll: true,
            inLarge: false,
            inSmall: false
        };

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText, inMath, inPhysics, inComputer, inAll, inLarge, inSmall) {
        this.setState({
            filterText: filterText,
            inMath: inMath,
            inPhysics: inPhysics,
            inComputer: inComputer,
            inAll: inAll,
            inLarge: inLarge,
            inSmall: inSmall
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inMath={this.state.inMath}
                    inPhysics={this.state.inPhysics}
                    inComputer={this.state.inComputer}
                    inAll={this.state.inAll}
                    inLarge={this.state.inLarge}
                    inSmall={this.state.inSmall}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inMath={this.state.inMath}
                    inPhysics={this.state.inPhysics}
                    inComputer={this.state.inComputer}
                    inAll={this.state.inAll}
                    inLarge={this.state.inLarge}
                    inSmall={this.state.inSmall}
                />
            </div>
        );
    }
}

var PRODUCTS = [
    {
        category: 'Mathematics',
        price: '$10.61',
        name: 'Basic College Mathematics (8th Edition)',
        author: 'Margaret L. Lial',
        ref: 'https://www.amazon.com/Basic-College-Mathematics-Margaret-Lial/dp/0321557123/ref=sr_1_1?ie=UTF8&qid=1480624366&sr=8-1&keywords=mathematics+textbook'
    },
    {
        category: 'Mathematics',
        price: '$281.70',
        name: 'Precalculus: Mathematics for Calculus',
        author: 'James Stewart',
        ref: 'https://www.amazon.com/Precalculus-Mathematics-Calculus-James-Stewart/dp/0840068077/ref=sr_1_2?ie=UTF8&qid=1480624366&sr=8-2&keywords=mathematics+textbook'
    },
    {
        category: 'Mathematics',
        price: '$87.16',
        name: 'Advanced Linear Algebra',
        author: 'Bruce Cooperstein',
        ref: 'https://www.amazon.com/Advanced-Linear-Algebra-Textbooks-Mathematics/dp/1482248840/ref=sr_1_1?s=books&ie=UTF8&qid=1480624505&sr=1-1&keywords=mathematics+textbook'
    },
    {
        category: 'Mathematics',
        price: '$211.24',
        name: 'Advanced Engineering Mathematics',
        author: 'Erwin Kreyszig',
        ref: 'https://www.amazon.com/Advanced-Engineering-Mathematics-Erwin-Kreyszig/dp/0470458364/ref=sr_1_5?s=books&ie=UTF8&qid=1480624597&sr=1-5&keywords=mathematics+textbook'
    },

    {
        category: 'Physics',
        price: '$13.18',
        name: 'Basic Physics: A Self-Teaching Guide',
        author: 'Karl F. Kuhn',
        ref: 'https://www.amazon.com/Basic-Physics-Self-Teaching-Karl-Kuhn/dp/0471134473/ref=sr_1_1?ie=UTF8&qid=1480623656&sr=8-1&keywords=physics+textbook'
    },
    {
        category: 'Physics',
        price: '$47.45',
        name: 'Quantum Field Theory for the Gifted Amateur',
        author: 'Tom Lancaster',
        ref: 'https://www.amazon.com/Quantum-Field-Theory-Gifted-Amateur/dp/019969933X/ref=sr_1_1?ie=UTF8&qid=1480628074&sr=8-1&keywords=quantum+physics+textbook'
    },
    {
        category: 'Physics',
        price: '$219.45',
        name: 'Conceptual Physics (12th Edition)',
        author: 'Paul G. Hewitt',
        ref: 'https://www.amazon.com/Conceptual-Physics-12th-Paul-Hewitt/dp/0321909100/ref=sr_1_16?ie=UTF8&qid=1480623656&sr=8-16&keywords=physics+textbook'
    },
    {
        category: 'Physics', price: '$267.03', name: 'Fundamentals of Physics', author: 'David Halliday',
        ref: 'https://www.amazon.com/Fundamentals-Physics-David-Halliday/dp/111823071X/ref=sr_1_14?ie=UTF8&qid=1480623656&sr=8-14&keywords=physics+textbook'
    },

    {
        category: 'Computer Science',
        price: '$90.00',
        name: 'Computational Science and Engineering',
        author: 'Gilbert Strang',
        ref: 'https://www.amazon.com/Computational-Science-Engineering-Gilbert-Strang/dp/0961408812/ref=sr_1_20?s=books&ie=UTF8&qid=1480632601&sr=1-20&keywords=computer+science+textbook'
    },
    {
        category: 'Computer Science',
        price: '$142.49',
        name: 'Computer Science: An Overview (12th Edition)',
        author: 'Glenn Brookshear',
        ref: 'https://www.amazon.com/Computer-Science-Overview-Glenn-Brookshear/dp/0133760065/ref=sr_1_1?ie=UTF8&qid=1480628239&sr=8-1&keywords=computer+science+textbook'
    },
    {
        category: 'Computer Science',
        price: '$164.00',
        name: 'Mathematical Structures for Computer Science',
        author: 'Judith L. Gersting',
        ref: 'https://www.amazon.com/Mathematical-Structures-Computer-Science-Gersting/dp/1429215100/ref=sr_1_40?ie=UTF8&qid=1480628430&sr=8-40&keywords=computer+science+textbook'
    },
    {
        category: 'Computer Science',
        price: '$76.04',
        name: 'The Nature of Computation',
        author: 'Cristopher Moore ',
        ref: 'https://www.amazon.com/Nature-Computation-Cristopher-Moore-ebook/dp/B005PUWUYY/ref=sr_1_3?ie=UTF8&qid=1480628593&sr=8-3&keywords=computer+science++textbook'
    },
    {
        category: 'Computer Science',
        price: '$230.95',
        name: 'C++: An Active Learning Approach',
        author: 'Todd W. Breedlove',
        ref: 'https://www.amazon.com/Learning-Approach-Todd-W-Breedlove/dp/0763757233/ref=sr_1_5?ie=UTF8&qid=1480628593&sr=8-5&keywords=computer+science++textbook'
    }


];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('container')
);