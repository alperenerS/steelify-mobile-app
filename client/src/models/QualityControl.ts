export interface QualityControl {
    id: number;
    name: string | null;
    technical_drawing_numbering: string;
    tools: string;
    description: string;
    actual_dimension: string;
    lower_tolerance: string;
    upper_tolerance: string;
    example_visual_url: string | null;
    status: string | null;
    type: string | null;
    created_at: string;
    step_name: string;
    form_id: number;
    measured_value_1: string | null;
    measured_value_2: string | null;
    measured_value_3: string | null;
    image_id: number;
    substep_id: number;
    work_id: number;
  }
  
  