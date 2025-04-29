import guideVideoWebm from './assets/video/demo.webm';

export const Description = () => {
    return (
        <div className="description-content">
            <h1 className="description-title">Task Overview</h1>
            <ul className="description-list">
                <li className="description-item">Create a hierarchical tree structure to display locations.</li>
                <li className="description-item">Render an SVG graphic when the last item in the location hierarchy is
                    clicked. (Building A, Building B, Building C, Building D)
                </li>
                <li className="description-item">Add the following interactive features:</li>
                <ul className="description-sublist">
                    <li className="description-subitem">Rotate SVG 180 degrees on toggle button click.</li>
                    <li className="description-subitem">Provide a color selector with 10 random colors. Selected color
                        applies instantly to all locations on the SVG floor plan.
                    </li>
                    <li className="description-subitem">Filter SVG locations by type (circle, rectangle, star). Match
                        each SVG item by ID to its shape type.
                    </li>
                </ul>
                <li className="description-item"><b>Ensure all code is covered with unit tests.</b></li>
                <li className="description-item">Preserve selected color, rotation, and location type filters when
                    switching between SVGs.
                </li>
                <li className="description-item">Style the application according to your vision to make it look good.</li>
            </ul>

            <h2 className="guide-title">Helpful Tips</h2>
            <ul className="description-list">
                <li className="description-item">Use SVGs from the assets folder: `floor1.svg`, `floor2.svg`,
                    `floor3.svg`, and `floor_plan.svg`.
                </li>
                <li className="description-item">Refer to `data/treeData.ts` for the location hierarchy data.</li>
                <li className="description-item">Locations in SVG are polygons with ids: rect1408', rect1410, path1529, rect1412, path1585, path15851.</li>
                <li className="description-item">Review `utils` and `constants` for useful helpers.</li>
                <li className="description-item">Show best practices in code, including hooks, TypeScript, and organized
                    structure.
                </li>
            </ul>

            <h2 className="guide-title">Demo Video</h2>
            <video className="guide-video" controls>
                <source src={guideVideoWebm} type="video/webm"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}