import BaseLoader from './BaseLoader';
import AMFLoader from './AMFLoader';
import AWDLoader from './AWDLoader';
import BabylonLoader from './BabylonLoader';
import BinaryLoader from './BinaryLoader';
import ColladaLoader from './ColladaLoader';
import CTMLoader from './CTMLoader';
import FBXLoader from './FBXLoader';
import GLTFLoader from './GLTFLoader';
import KMZLoader from './KMZLoader';
import MD2Loader from './MD2Loader';
import ObjectLoader from './ObjectLoader';
import OBJLoader from './OBJLoader';
import PLYLoader from './PLYLoader';
import STLLoader from './STLLoader';
import VTKLoader from './VTKLoader';
import LOLLoader from './LOLLoader';

const Loaders = {
    'amf': AMFLoader,
    'awd': AWDLoader,
    'babylon': BabylonLoader,
    'binary': BinaryLoader,
    'ctm': CTMLoader,
    'dae': ColladaLoader,
    'fbx': FBXLoader,
    'glb': GLTFLoader,
    'gltf': GLTFLoader,
    'kmz': KMZLoader,
    'md2': MD2Loader,
    'json': ObjectLoader,
    'obj': OBJLoader,
    'ply': PLYLoader,
    'stl': STLLoader,
    'vtk': VTKLoader,
    'lol': LOLLoader
};

/**
 * ModelLoader
 * @author tengge / https://github.com/tengge1
 */
function ModelLoader() {
    BaseLoader.call(this);
}

ModelLoader.prototype = Object.create(BaseLoader.prototype);
ModelLoader.prototype.constructor = ModelLoader;

ModelLoader.prototype.load = function (url, options) {
    options = options || {};
    var type = options.type;

    if (type === undefined) {
        console.warn(`ModelLoader: 未传递type参数，无法加载。`);
        return new Promise(resolve => {
            resolve(null);
        });
    }

    return new Promise(resolve => {
        var loader = Loaders[type];
        if (loader === undefined) {
            console.warn(`ModelLoader: 不存在加载${type}后缀模型的加载器。`);
            resolve(null);
            return;
        }
        (new loader(this.app)).load(url, options).then(obj => {
            resolve(obj);
        });
    });
};

export default ModelLoader;