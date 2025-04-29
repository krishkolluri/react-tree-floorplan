export interface Location {
  id: string;
  name: string;
  floorplan?: string;
  children?: Location[];
}

export const locationData :Location[]= [
  {
    "id": "1",
    "name": "Germany",
    "children": [
      {
        "id": "1-1",
        "name": "Berlin",
        "children": [
          {
            "id": "1-1-1",
            "name": "Building A",
            "floorplan": "floor1.svg"
          },
          {
            "id": "1-1-2",
            "name": "Building B",
            "floorplan": "floor2.svg"
          }
        ]
      },
      {
        "id": "1-2",
        "name": "Munich",
        "children": [
          {
            "id": "1-2-1",
            "name": "Building C",
            "floorplan": "floor3.svg"
          }
        ]
      }
    ]
  },
  {
    "id": "2",
    "name": "France",
    "children": [
      {
        "id": "2-1",
        "name": "Paris",
        "children": [
          {
            "id": "2-1-1",
            "name": "Building D",
            "floorplan": "floor_plan.svg"
          }
        ]
      }
    ]
  }
]
