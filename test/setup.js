import chai from 'chai'
import sinonChai from 'sinon-chai'
import jsdom from 'jsdom-global'
// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

chai.use(sinonChai)
const cleanup = jsdom()
