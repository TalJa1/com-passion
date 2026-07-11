from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """Base schema: camelCase JSON in/out, loadable from ORM objects."""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)
